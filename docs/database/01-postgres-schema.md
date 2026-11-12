# 01 — PostgreSQL Relational Schema & Row-Level Security (RLS)

> **Document Scope:** Complete PostgreSQL DDL, custom ENUMs, relational integrity constraints, performance indexes, and Row-Level Security (RLS) policies for **EMSA-ECUSTA Digital Portal & Academy LMS** (Supabase PostgreSQL).

---

## 1. Entity Relationship Overview

```text
auth.users (Supabase Auth)
   ├── 1:1 ──► profiles (Single public STUDENT account type)
   │              ├── 1:N ──► enrollments ──► 1:N ──► lesson_progress
   │              ├── 1:N ──► submissions ──► 1:N ──► submission_revisions
   │              │                 └── 1:N ──► submission_reviews
   │              └── 1:N ──► certificates
   └── 0:1 ──► chapter_officers (Internal signed administrative claim registry)
```

---

## 2. Extensions & Custom ENUM Types

```sql
-- Required for UUID generation and case-insensitive email handling if desired
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Academic / Living Archive batch tiers
CREATE TYPE public.academic_batch_tier AS ENUM (
  '2026-2027',
  '2025-2026',
  '2024-2025'
);

-- 2. Six IFMSA-aligned standing committees
CREATE TYPE public.standing_committee_slug AS ENUM (
  'scome',
  'scoph',
  'scora',
  'scope',
  'scorp',
  'score'
);

-- 3. Manual registrar cross-reference eligibility lifecycle
CREATE TYPE public.eligibility_status AS ENUM (
  'pending',
  'verified',
  'rejected',
  'suspended'
);

-- 4. Course enrollment state
CREATE TYPE public.enrollment_status AS ENUM (
  'active',
  'completed',
  'withdrawn'
);

-- 5. Approved external URL submission platforms (Zero-Storage Policy)
CREATE TYPE public.submission_platform AS ENUM (
  'google_drive',
  'canva',
  'figma',
  'youtube',
  'other_approved'
);

-- 6. Officer capstone evaluation outcomes
CREATE TYPE public.review_grade AS ENUM (
  'changes_requested',
  'pass',
  'distinction',
  'fail'
);

-- 7. Cryptographic certificate ledger states
CREATE TYPE public.certificate_status AS ENUM (
  'active',
  'revoked'
);
```

---

## 3. Core Tables & Integrity Constraints

### 3.1 `chapter_officers`
Stores internal chapter officers authorized to exercise administrative claims (eligibility review, capstone grading, certificate issuance, and ledger revocation). **Never selectable by students during registration.**

```sql
CREATE TABLE public.chapter_officers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id      UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  officer_title     TEXT NOT NULL,
  committee_slug    public.standing_committee_slug NULL, -- NULL for Executive Board / Academy Directors
  batch_tier        public.academic_batch_tier NOT NULL,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  appointed_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deactivated_at    TIMESTAMPTZ NULL,
  CONSTRAINT chk_officer_deactivation_order CHECK (
    deactivated_at IS NULL OR deactivated_at >= appointed_at
  )
);
```

### 3.2 `profiles`
Represents the **single public account type (`STUDENT`)**. Enforces institutional `@ecusta.edu.et` email domain validation at the database boundary.

```sql
CREATE TABLE public.profiles (
  id                    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email                 TEXT NOT NULL UNIQUE,
  full_name             TEXT NOT NULL,
  student_id_number     TEXT NOT NULL UNIQUE,
  batch_tier            public.academic_batch_tier NOT NULL,
  eligibility_status    public.eligibility_status NOT NULL DEFAULT 'pending',
  eligibility_note      TEXT NULL,
  verified_by_officer   UUID NULL REFERENCES public.chapter_officers(id) ON DELETE SET NULL,
  verified_at           TIMESTAMPTZ NULL,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_institutional_email_domain CHECK (
    LOWER(email) ~ '^[a-z0-9._%+-]+@ecusta\.edu\.et$'
  ),
  CONSTRAINT chk_full_name_nonempty CHECK (LENGTH(TRIM(full_name)) >= 2)
);
```

### 3.3 `enrollments`
Tracks verified student enrollments into static JSON course slugs (`src/data/`).

```sql
CREATE TABLE public.enrollments (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_slug       TEXT NOT NULL,
  committee_slug    public.standing_committee_slug NOT NULL,
  status            public.enrollment_status NOT NULL DEFAULT 'active',
  enrolled_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at      TIMESTAMPTZ NULL,
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_student_course_enrollment UNIQUE (student_id, course_slug),
  CONSTRAINT chk_course_slug_kebab CHECK (course_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);
```

### 3.4 `lesson_progress`
Idempotent per-lesson checkpoints used to compute 100% completion and unlock the capstone submission gate.

```sql
CREATE TABLE public.lesson_progress (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id     UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  student_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_slug       TEXT NOT NULL,
  lesson_id         TEXT NOT NULL,
  completed_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_enrollment_lesson_checkpoint UNIQUE (enrollment_id, lesson_id),
  CONSTRAINT chk_lesson_id_nonempty CHECK (LENGTH(TRIM(lesson_id)) > 0)
);
```

### 3.5 `submissions`
Current active capstone project submission per enrollment (Zero-Storage Policy: external HTTPS URL only).

```sql
CREATE TABLE public.submissions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id       UUID NOT NULL UNIQUE REFERENCES public.enrollments(id) ON DELETE CASCADE,
  student_id          UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_slug         TEXT NOT NULL,
  platform            public.submission_platform NOT NULL,
  current_url         TEXT NOT NULL,
  current_revision    INTEGER NOT NULL DEFAULT 1,
  latest_grade        public.review_grade NULL,
  submitted_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_submission_https_url CHECK (current_url ~* '^https://'),
  CONSTRAINT chk_current_revision_positive CHECK (current_revision >= 1)
);
```

### 3.6 `submission_revisions`
Immutable append-only history of every submitted external link (`1, 2, ..., n + 1`).

```sql
CREATE TABLE public.submission_revisions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id     UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
  student_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  revision_number   INTEGER NOT NULL,
  platform          public.submission_platform NOT NULL,
  external_url      TEXT NOT NULL,
  student_notes     TEXT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_submission_revision_num UNIQUE (submission_id, revision_number),
  CONSTRAINT chk_revision_https_url CHECK (external_url ~* '^https://'),
  CONSTRAINT chk_revision_number_positive CHECK (revision_number >= 1)
);
```

### 3.7 `submission_reviews`
Immutable officer evaluations tied to a specific `submission_revisions` entry.

```sql
CREATE TABLE public.submission_reviews (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id     UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
  revision_id       UUID NOT NULL REFERENCES public.submission_revisions(id) ON DELETE RESTRICT,
  reviewer_id       UUID NOT NULL REFERENCES public.chapter_officers(id) ON DELETE RESTRICT,
  grade             public.review_grade NOT NULL,
  feedback_markdown TEXT NOT NULL,
  reviewed_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_review_per_revision UNIQUE (revision_id),
  CONSTRAINT chk_feedback_nonempty CHECK (LENGTH(TRIM(feedback_markdown)) >= 5)
);
```

### 3.8 `certificates`
Cryptographic credential ledger storing issued certificates, deterministic HMAC-SHA-256 signatures, and revocation metadata.

```sql
CREATE TABLE public.certificates (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id      TEXT NOT NULL UNIQUE, -- Human-readable ID e.g. EMSA-SCOME-2026-00042
  student_id          UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  enrollment_id       UUID NOT NULL UNIQUE REFERENCES public.enrollments(id) ON DELETE RESTRICT,
  submission_id       UUID NOT NULL UNIQUE REFERENCES public.submissions(id) ON DELETE RESTRICT,
  recipient_name      TEXT NOT NULL,
  course_slug         TEXT NOT NULL,
  course_title        TEXT NOT NULL,
  committee_slug      public.standing_committee_slug NOT NULL,
  institution         TEXT NOT NULL DEFAULT 'EMSA-ECUSTA',
  issue_date_iso      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  hmac_signature      TEXT NOT NULL,
  key_version         INTEGER NOT NULL DEFAULT 1,
  status              public.certificate_status NOT NULL DEFAULT 'active',
  issued_by_officer   UUID NOT NULL REFERENCES public.chapter_officers(id) ON DELETE RESTRICT,
  revoked_by_officer  UUID NULL REFERENCES public.chapter_officers(id) ON DELETE RESTRICT,
  revoked_at          TIMESTAMPTZ NULL,
  revocation_reason   TEXT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_certificate_id_format CHECK (certificate_id ~ '^EMSA-[A-Z0-9-]+$'),
  CONSTRAINT chk_revocation_consistency CHECK (
    (status = 'active' AND revoked_at IS NULL AND revoked_by_officer IS NULL AND revocation_reason IS NULL)
    OR
    (status = 'revoked' AND revoked_at IS NOT NULL AND revoked_by_officer IS NOT NULL AND LENGTH(TRIM(revocation_reason)) >= 5)
  )
);
```

---

## 4. Performance Indexes & Timestamp Triggers

```sql
-- Profiles & eligibility queue
CREATE INDEX idx_profiles_eligibility_status ON public.profiles (eligibility_status, created_at DESC);
CREATE INDEX idx_profiles_batch_tier ON public.profiles (batch_tier);

-- Enrollments & progress checkpoints
CREATE INDEX idx_enrollments_student_id ON public.enrollments (student_id);
CREATE INDEX idx_enrollments_course_slug ON public.enrollments (course_slug);
CREATE INDEX idx_lesson_progress_student_course ON public.lesson_progress (student_id, course_slug);

-- Submissions, revisions & review queue
CREATE INDEX idx_submissions_student_id ON public.submissions (student_id);
CREATE INDEX idx_submissions_pending_review ON public.submissions (latest_grade, updated_at ASC);
CREATE INDEX idx_submission_revisions_submission ON public.submission_revisions (submission_id, revision_number DESC);
CREATE INDEX idx_submission_reviews_submission ON public.submission_reviews (submission_id, reviewed_at DESC);

-- Certificate ledger & public verification
CREATE UNIQUE INDEX idx_certificates_public_id ON public.certificates (certificate_id);
CREATE INDEX idx_certificates_student_id ON public.certificates (student_id);
CREATE INDEX idx_certificates_status ON public.certificates (status, issue_date_iso DESC);

-- Shared updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_enrollments_updated_at
  BEFORE UPDATE ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

---

## 5. Row-Level Security (RLS) Policies

All transactional tables enforce RLS by default (`ENABLE ROW LEVEL SECURITY`). Privilege escalation is prevented by evaluating signed JWT administrative claims (`app_metadata.admin_role = 'chapter_officer'`) **and** verifying active membership in `public.chapter_officers`.

### 5.1 Officer Authorization Helper Function

```sql
CREATE OR REPLACE FUNCTION public.is_active_chapter_officer()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'admin_role') = 'chapter_officer',
    FALSE
  )
  AND EXISTS (
    SELECT 1
    FROM public.chapter_officers co
    WHERE co.auth_user_id = auth.uid()
      AND co.is_active = TRUE
  );
$$;
```

### 5.2 Enable RLS & Define Policies

```sql
ALTER TABLE public.chapter_officers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_revisions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_reviews    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates          ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 1. chapter_officers: Active officers may read roster; mutations via service role only
-- ============================================================================
CREATE POLICY "officers_select_own_or_roster"
  ON public.chapter_officers FOR SELECT
  USING (auth.uid() = auth_user_id OR public.is_active_chapter_officer());

-- ============================================================================
-- 2. profiles: Strict student tenant isolation + officer eligibility management
-- ============================================================================
CREATE POLICY "students_select_own_profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_active_chapter_officer());

CREATE POLICY "students_insert_own_profile"
  ON public.profiles FOR INSERT
  WITH CHECK (
    auth.uid() = id
    AND eligibility_status = 'pending'
    AND verified_by_officer IS NULL
    AND verified_at IS NULL
  );

CREATE POLICY "students_update_own_safe_fields"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    -- Prevent students from elevating eligibility_status themselves via PostgREST
    AND eligibility_status = (SELECT p.eligibility_status FROM public.profiles p WHERE p.id = auth.uid())
  );

CREATE POLICY "officers_update_student_eligibility"
  ON public.profiles FOR UPDATE
  USING (public.is_active_chapter_officer())
  WITH CHECK (public.is_active_chapter_officer());

-- ============================================================================
-- 3. enrollments: Only verified students can enroll in their own tenant
-- ============================================================================
CREATE POLICY "students_and_officers_select_enrollments"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = student_id OR public.is_active_chapter_officer());

CREATE POLICY "verified_students_insert_own_enrollment"
  ON public.enrollments FOR INSERT
  WITH CHECK (
    auth.uid() = student_id
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.eligibility_status = 'verified'
    )
  );

CREATE POLICY "officers_update_enrollment_status"
  ON public.enrollments FOR UPDATE
  USING (public.is_active_chapter_officer())
  WITH CHECK (public.is_active_chapter_officer());

-- ============================================================================
-- 4. lesson_progress: Student-owned checkpoints
-- ============================================================================
CREATE POLICY "students_and_officers_select_progress"
  ON public.lesson_progress FOR SELECT
  USING (auth.uid() = student_id OR public.is_active_chapter_officer());

CREATE POLICY "students_insert_own_progress"
  ON public.lesson_progress FOR INSERT
  WITH CHECK (
    auth.uid() = student_id
    AND EXISTS (
      SELECT 1 FROM public.enrollments e
      WHERE e.id = enrollment_id AND e.student_id = auth.uid()
    )
  );

-- ============================================================================
-- 5. submissions & submission_revisions: Student submitter + officer reviewers
-- ============================================================================
CREATE POLICY "students_and_officers_select_submissions"
  ON public.submissions FOR SELECT
  USING (auth.uid() = student_id OR public.is_active_chapter_officer());

CREATE POLICY "students_insert_own_submission"
  ON public.submissions FOR INSERT
  WITH CHECK (auth.uid() = student_id AND latest_grade IS NULL);

CREATE POLICY "students_update_own_submission_url_only"
  ON public.submissions FOR UPDATE
  USING (auth.uid() = student_id AND (latest_grade IS NULL OR latest_grade = 'changes_requested'))
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "officers_update_submission_grade"
  ON public.submissions FOR UPDATE
  USING (public.is_active_chapter_officer())
  WITH CHECK (public.is_active_chapter_officer());

CREATE POLICY "students_and_officers_select_revisions"
  ON public.submission_revisions FOR SELECT
  USING (auth.uid() = student_id OR public.is_active_chapter_officer());

CREATE POLICY "students_insert_immutable_revisions"
  ON public.submission_revisions FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Note: No UPDATE or DELETE policies exist on submission_revisions (append-only).

-- ============================================================================
-- 6. submission_reviews: Officers insert immutable reviews; students read own
-- ============================================================================
CREATE POLICY "students_and_officers_select_reviews"
  ON public.submission_reviews FOR SELECT
  USING (
    public.is_active_chapter_officer()
    OR EXISTS (
      SELECT 1 FROM public.submissions s
      WHERE s.id = submission_id AND s.student_id = auth.uid()
    )
  );

CREATE POLICY "officers_insert_immutable_reviews"
  ON public.submission_reviews FOR INSERT
  WITH CHECK (public.is_active_chapter_officer());

-- Note: No UPDATE or DELETE policies exist on submission_reviews (append-only).

-- ============================================================================
-- 7. certificates: Student owns read; officers issue & revoke;
--    Public verification uses sanitized server-side DAL projection (/api/v1/verify)
-- ============================================================================
CREATE POLICY "students_and_officers_select_certificates"
  ON public.certificates FOR SELECT
  USING (auth.uid() = student_id OR public.is_active_chapter_officer());

CREATE POLICY "officers_insert_certificates"
  ON public.certificates FOR INSERT
  WITH CHECK (public.is_active_chapter_officer());

CREATE POLICY "officers_revoke_certificates"
  ON public.certificates FOR UPDATE
  USING (public.is_active_chapter_officer())
  WITH CHECK (public.is_active_chapter_officer());
```

> **Public Verification Security Note:** Anonymous callers hitting `/verify/[certificateId]` **never** query `public.certificates` directly via the browser Supabase anon key. Instead, the Next.js server executes the verification query through `ICertificateRepository.findPublicVerificationRecord(certificateId)` using a restricted server context that returns only the sanitized public projection (`certificate_id`, `recipient_name`, `course_title`, `committee_slug`, `institution`, `issue_date_iso`, `hmac_signature`, `status`, `revoked_at`).

