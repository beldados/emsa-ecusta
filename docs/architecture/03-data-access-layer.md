# 03 — Data Access Layer (DAL) & Repository Pattern

> **Document Scope:** Architectural contract for isolating UI components and API routes from concrete storage engines (`src/data/` JSON files and PostgreSQL/Supabase).

---

## 1. Architectural Mandate

The **Data Access Layer (DAL)** enforces a strict boundary between application presentation logic and data persistence:

1. **Zero Direct Imports in UI:** React Server Components, Client Components, and Page routes under `src/app/` and `src/components/` **must NEVER** import `.json` files from `src/data/` directly, nor instantiate Supabase database clients directly.
2. **Zero Raw Queries in Route Handlers:** API endpoints under `src/app/api/v1/` must delegate all persistence and domain queries to DAL repository interfaces.
3. **Storage-Agnostic Contracts:** Domain logic depends solely on TypeScript interfaces defined in `src/lib/dal/contracts/`. Concrete implementations live in `src/lib/dal/repositories/`.

```text
  src/app/** & src/components/**
               |
               |  depends only on
               v
  src/lib/dal/contracts/
    - IStudentRepository
    - IProgressRepository
    - ISubmissionRepository
    - ICertificateRepository
               ^
               |  implemented by
  src/lib/dal/repositories/
    ├── mock/ (Local JSON + in-memory adapters for offline/test)
    └── supabase/ (Production PostgreSQL + RLS adapters)
```

---

## 2. Core Repository Contracts

All contracts reside in `src/lib/dal/contracts/` and return normalized domain DTOs defined in `src/types/` (never raw database row shapes with snake_case columns leaking into UI props).

### 2.1 `IStudentRepository`

Manages student profile retrieval, institutional domain gating metadata, and manual registrar eligibility workflows.

```ts
export interface IStudentRepository {
  /** Retrieve a student profile by authenticated user UUID. */
  findById(studentId: string): Promise<StudentProfile | null>;

  /** Retrieve a student profile by verified @ecusta.edu.et email. */
  findByEmail(email: string): Promise<StudentProfile | null>;

  /** Create or initialize the single STUDENT profile record post-signup. */
  createProfile(input: CreateStudentProfileInput): Promise<StudentProfile>;

  /** List students filtered by eligibility status for officer review queue. */
  listByEligibilityStatus(
    status: EligibilityStatus,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<StudentProfile>>;

  /** Officer-only transition: pending -> verified | rejected | suspended. */
  updateEligibilityStatus(input: {
    studentId: string;
    nextStatus: EligibilityStatus;
    reviewedByOfficerId: string;
    reviewNote?: string;
  }): Promise<StudentProfile>;
}
```

### 2.2 `IProgressRepository`

Manages course enrollments, per-lesson completion checkpoints, and deterministic calculation of capstone gate eligibility (100% completion).

```ts
export interface IProgressRepository {
  /** Enroll a verified student into an Academy course slug. */
  enrollStudent(studentId: string, courseSlug: string): Promise<EnrollmentRecord>;

  /** Fetch all enrollments and computed completion ratios for a student. */
  listStudentEnrollments(studentId: string): Promise<EnrollmentSummary[]>;

  /** Fetch ordered lesson completion checkpoints for a specific course. */
  getCourseProgress(
    studentId: string,
    courseSlug: string
  ): Promise<CourseProgressDetail>;

  /** Idempotently mark a lesson checkpoint as completed and recompute ratio. */
  markLessonCompleted(input: {
    studentId: string;
    courseSlug: string;
    lessonId: string;
  }): Promise<CourseProgressDetail>;

  /** Authoritative server-side check: true only when 100% of required lessons are complete. */
  isCapstoneUnlocked(studentId: string, courseSlug: string): Promise<boolean>;
}
```

### 2.3 `ISubmissionRepository`

Manages external-URL capstone submissions, immutable revision history (`n + 1`), and officer review/grading records.

```ts
export interface ISubmissionRepository {
  /** Create initial capstone submission (revision 1) with validated external URL. */
  createSubmission(input: CreateSubmissionInput): Promise<SubmissionDetail>;

  /** Submit revision n + 1 after changes_requested, archiving prior URL immutably. */
  submitRevision(input: SubmitRevisionInput): Promise<SubmissionDetail>;

  /** Retrieve a student's active submission, revision timeline, and review feedback. */
  findStudentSubmission(
    studentId: string,
    courseSlug: string
  ): Promise<SubmissionDetail | null>;

  /** Officer-only queue of submissions awaiting review. */
  listPendingReviews(
    filter?: SubmissionQueueFilter
  ): Promise<PaginatedResult<SubmissionQueueItem>>;

  /** Record an immutable officer review (changes_requested | pass | distinction | fail). */
  recordReview(input: RecordSubmissionReviewInput): Promise<SubmissionReviewRecord>;
}
```

### 2.4 `ICertificateRepository`

Manages cryptographic certificate issuance, public zero-auth verification lookups, and officer revocation/audit operations.

```ts
export interface ICertificateRepository {
  /** Issue a signed certificate record atomically upon passing capstone review. */
  issueCertificate(input: IssueCertificateInput): Promise<CertificateRecord>;

  /** Look up full certificate ledger record for internal/student views. */
  findByCertificateId(certificateId: string): Promise<CertificateRecord | null>;

  /**
   * Public zero-auth sanitized projection for /verify/[certificateId].
   * Must NEVER expose student email, internal UUIDs, or reviewer notes.
   */
  findPublicVerificationRecord(
    certificateId: string
  ): Promise<PublicCertificateVerificationRecord | null>;

  /** List all issued/revoked credentials for the officer ledger console. */
  listLedgerEntries(
    filter?: LedgerFilter
  ): Promise<PaginatedResult<CertificateLedgerEntry>>;

  /** Officer-only revocation with mandatory audit reason. */
  revokeCertificate(input: {
    certificateId: string;
    revokedByOfficerId: string;
    reason: string;
  }): Promise<CertificateRecord>;
}
```

---

## 3. Adapter Swapping Strategy

Because all Server Actions, App Router pages, and API v1 routes resolve repositories through a central provider (`src/lib/dal/index.ts` or factory container), switching persistence backends requires **zero UI or business-logic rewrites**:

| Environment / Phase | Active Adapter | Backing Store | Configuration Trigger |
| :--- | :--- | :--- | :--- |
| **Local UI Prototyping / Offline Dev** | `MockJsonRepositories` | Static `src/data/*.json` + ephemeral memory/local fixture state | `DAL_ADAPTER=mock` |
| **Integration & Automated Testing** | `InMemoryTestRepositories` | Deterministic seeded test fixtures | Test runner environment |
| **Staging & Production** | `SupabasePostgresRepositories` | Supabase PostgreSQL with RLS & service-role/user-scoped clients | `DAL_ADAPTER=supabase` |

### Swapping Rules
1. **DTO Parity:** Both mock and PostgreSQL adapters must satisfy identical return types, pagination envelopes, and domain error classes (e.g., `DomainValidationError`, `UnauthorizedError`, `EligibilityRequiredError`, `ConflictError`).
2. **Error Normalization:** Database-specific error codes (such as PostgreSQL `23505` unique violation) are translated inside the repository adapter into typed domain errors before crossing back to the API or UI boundary.
3. **Zero Leakage:** Supabase client instances (`src/lib/supabase/`) are imported exclusively by `src/lib/dal/repositories/supabase/*` and auth middleware—never by `src/components/`.

