# 01 — EMSA Academy LMS Lifecycle Workflows

> **Document Scope:** End-to-end operational workflows and Mermaid sequence diagrams covering discovery, institutional domain gating, eligibility verification, progression, capstone submissions, grading, and cryptographic verification.

---

## 1. Public Visitor → Course Discovery

Unauthenticated visitors browse the EMSA Academy catalog and inspect full syllabus details sourced via the DAL from version-controlled course metadata (`src/data/`).

```mermaid
sequenceDiagram
  autonumber
  actor Visitor as Public Visitor
  participant App as Next.js App Router
  participant DAL as ICatalogRepository (DAL)
  participant Data as Static Metadata (src/data)

  Visitor->>App: GET /academy/[courseSlug]
  App->>DAL: getCourseBySlug(courseSlug)
  DAL->>Data: Read course syllabus & committee metadata
  Data-->>DAL: Course metadata JSON
  DAL-->>App: Normalized CourseDetailDTO
  App-->>Visitor: Render syllabus, prerequisites & "Enroll via Student Portal" CTA
```

---

## 2. Student Registration → Institutional Domain Gate (`@ecusta.edu.et`)

Public sign-up exposes **only one account type (`STUDENT`)** and enforces the `@ecusta.edu.et` domain gate both in validation schemas and PostgreSQL `CHECK` constraints.

```mermaid
sequenceDiagram
  autonumber
  actor User as Prospective Student
  participant UI as Registration UI
  participant Auth as Supabase Auth
  participant DAL as IStudentRepository
  participant DB as PostgreSQL (profiles)

  User->>UI: Submit registration (fullName, studentId, email, password)
  UI->>UI: Validate email matches *@ecusta.edu.et
  alt Non-institutional email
    UI-->>User: Reject with 400 Institutional Domain Required
  else Valid @ecusta.edu.et email
    UI->>Auth: signUp(email, password)
    Auth-->>User: Send institutional verification email
    User->>Auth: Click verification link
    Auth-->>UI: Authenticated STUDENT session
    UI->>DAL: createProfile(authUserId, email, fullName, studentId)
    DAL->>DB: INSERT INTO profiles (eligibility_status = 'pending')
    DB-->>DAL: Profile created (pending)
    DAL-->>UI: StudentProfile (pending)
    UI-->>User: Redirect to /academy/dashboard (Pending Eligibility Banner)
  end
```

---

## 3. Student Eligibility Review (Manual Registrar Cross-Reference)

Chapter officers manually cross-reference newly registered student IDs and institutional emails against official registrar rosters before unlocking course enrollment.

```mermaid
sequenceDiagram
  autonumber
  actor Officer as Chapter Officer
  participant AdminUI as /academy/admin/eligibility
  participant API as /api/v1/admin/eligibility
  participant DAL as IStudentRepository
  participant DB as PostgreSQL (profiles)

  Officer->>AdminUI: Open pending eligibility queue
  AdminUI->>API: GET /api/v1/admin/eligibility?status=pending
  API->>API: Verify signed chapter_officer claim
  API->>DAL: listByEligibilityStatus('pending')
  DAL->>DB: SELECT pending profiles (RLS: officer)
  DB-->>DAL: Pending student rows
  DAL-->>AdminUI: Render queue with student_id_number & email
  Officer->>Officer: Cross-reference against official ECUSTA registrar list
  Officer->>AdminUI: Approve or Reject student with audit note
  AdminUI->>API: PATCH /api/v1/admin/eligibility
  API->>DAL: updateEligibilityStatus(studentId, 'verified', officerId, note)
  DAL->>DB: UPDATE profiles SET eligibility_status = 'verified', verified_by_officer = officerId
  DB-->>DAL: Updated profile
  DAL-->>AdminUI: 200 OK (Student verified)
```

---

## 4. Course Enrollment & Lesson Progress Checkpointing

Verified students enroll in standing-committee courses and record idempotent lesson completion checkpoints inside `/academy/learn/[courseSlug]`.

```mermaid
sequenceDiagram
  autonumber
  actor Student as Verified Student
  participant Player as /academy/learn/[courseSlug]
  participant API as /api/v1/academy/progress
  participant DAL as IProgressRepository
  participant DB as PostgreSQL (enrollments & lesson_progress)

  Student->>Player: Click "Enroll in Course"
  Player->>API: POST /api/v1/academy/enroll
  API->>DAL: enrollStudent(studentId, courseSlug)
  DAL->>DB: INSERT INTO enrollments (RLS checks eligibility_status = 'verified')
  DB-->>DAL: EnrollmentRecord
  DAL-->>Player: Enrollment active

  loop For each lesson in syllabus
    Student->>Player: Complete lesson & click "Mark Lesson Complete"
    Player->>API: POST /api/v1/academy/progress
    API->>DAL: markLessonCompleted(studentId, courseSlug, lessonId)
    DAL->>DB: INSERT INTO lesson_progress ON CONFLICT DO NOTHING
    DB-->>DAL: Updated checkpoint count
    DAL-->>Player: Return completion percentage (0%..99%)
  end
```

---

## 5. 100% Completion → Capstone Gate Unlock

The capstone project submission form remains locked until server-side verification confirms 100% of required lessons for the course slug are completed.

```mermaid
sequenceDiagram
  autonumber
  actor Student as Verified Student
  participant Player as /academy/learn/[courseSlug]
  participant API as /api/v1/academy/progress
  participant DAL as IProgressRepository
  participant DB as PostgreSQL (lesson_progress)

  Student->>Player: Mark final remaining lesson complete
  Player->>API: POST /api/v1/academy/progress
  API->>DAL: markLessonCompleted(studentId, courseSlug, finalLessonId)
  DAL->>DB: INSERT INTO lesson_progress
  API->>DAL: isCapstoneUnlocked(studentId, courseSlug)
  DAL->>DB: Count completed lessons vs static syllabus count
  DB-->>DAL: completedCount == totalRequiredLessons
  DAL-->>API: unlocked = true (100%)
  API-->>Player: 200 OK { completionPct: 100, capstoneUnlocked: true }
  Player-->>Student: Unlock Capstone External Link Submission Panel
```

---

## 6. External Link Project Submission

Following the **Zero-Storage Policy**, the student submits an HTTPS link to an approved external platform (Google Drive, Canva, Figma, YouTube, or Other Approved).

```mermaid
sequenceDiagram
  autonumber
  actor Student as Verified Student
  participant SubUI as Submission Panel
  participant API as /api/v1/academy/submissions
  participant Val as URL Security Validator
  participant DAL as ISubmissionRepository
  participant DB as PostgreSQL (submissions & revisions)

  Student->>SubUI: Select platform & paste HTTPS project URL
  SubUI->>API: POST /api/v1/academy/submissions
  API->>API: Verify session & isCapstoneUnlocked() === true
  API->>Val: Validate HTTPS, domain allowlist & anti-SSRF rules
  alt Validation fails
    Val-->>API: ValidationError (Untrusted domain / non-HTTPS)
    API-->>SubUI: 422 Unprocessable Entity
    SubUI-->>Student: Display platform URL requirements
  else Valid external URL
    Val-->>API: Canonicalized URL
    API->>DAL: createSubmission(studentId, courseSlug, platform, url)
    DAL->>DB: INSERT INTO submissions (current_revision = 1)
    DAL->>DB: INSERT INTO submission_revisions (revision_number = 1)
    DB-->>DAL: SubmissionDetail
    DAL-->>API: 201 Created
    API-->>SubUI: Show "Submitted — Pending Officer Review"
  end
```

---

## 7. Internal Review, Grading & Feedback

Chapter officers inspect submitted external links in `/academy/admin/reviews` and record immutable evaluations. If changes are requested, the student submits revision `n + 1`.

```mermaid
sequenceDiagram
  autonumber
  actor Officer as Chapter Officer
  actor Student as Student
  participant ReviewUI as /academy/admin/reviews
  participant API as /api/v1/admin/reviews
  participant DAL as ISubmissionRepository
  participant DB as PostgreSQL (submission_reviews & revisions)

  Officer->>ReviewUI: Open pending capstone submission
  Officer->>Officer: Inspect student project via external platform URL
  Officer->>ReviewUI: Select grade ('changes_requested' | 'pass' | 'distinction' | 'fail') + feedback
  ReviewUI->>API: POST /api/v1/admin/reviews
  API->>API: Verify signed chapter_officer claim
  API->>DAL: recordReview(submissionId, revisionId, officerId, grade, feedback)
  DAL->>DB: INSERT INTO submission_reviews & UPDATE submissions.latest_grade
  DB-->>DAL: SubmissionReviewRecord

  alt grade == 'changes_requested'
    Student->>API: POST /api/v1/academy/submissions/revisions (Revision n + 1 URL)
    API->>DAL: submitRevision(submissionId, newUrl)
    DAL->>DB: INSERT INTO submission_revisions (revision_number = n + 1) & UPDATE submissions
    DB-->>Student: Revision queued for re-review
  end
```

---

## 8. Passing Grade → Automated Certificate Generation

When an officer records a passing grade (`pass` or `distinction`), the backend deterministically computes the HMAC-SHA-256 certificate signature and seals the record in the ledger.

```mermaid
sequenceDiagram
  autonumber
  actor Officer as Chapter Officer
  participant API as /api/v1/admin/reviews
  participant Crypto as HMAC-SHA-256 Engine
  participant DAL as ICertificateRepository
  participant DB as PostgreSQL (certificates & enrollments)

  Officer->>API: Submit passing grade ('pass' or 'distinction')
  API->>API: Confirm officer claim & passing review recorded
  API->>Crypto: signCertificatePayload(certificateId, recipientName, courseTitle, issueDateISO, 'EMSA-ECUSTA')
  Crypto-->>API: Deterministic 64-char hex HMAC signature
  API->>DAL: issueCertificate({ certificateId, ..., hmacSignature, officerId })
  DAL->>DB: INSERT INTO certificates (status = 'active')
  DAL->>DB: UPDATE enrollments SET status = 'completed', completed_at = NOW()
  DB-->>DAL: CertificateRecord
  DAL-->>API: Certificate issued
  API-->>Officer: 201 Created (Certificate ID & Verification URL)
```

---

## 9. Public QR Code & URL Verification

Anyone (employers, residency boards, peers) can scan a certificate QR code or open `/verify/[certificateId]` with zero authentication to validate authenticity and revocation status.

```mermaid
sequenceDiagram
  autonumber
  actor Verifier as Public Verifier
  participant VerifyUI as /verify/[certificateId]
  participant API as /api/v1/verify/[certificateId]
  participant DAL as ICertificateRepository
  participant Crypto as HMAC-SHA-256 Engine
  participant DB as PostgreSQL (certificates)

  Verifier->>VerifyUI: Scan QR / GET /verify/[certificateId]
  VerifyUI->>API: GET /api/v1/verify/[certificateId]
  API->>DAL: findPublicVerificationRecord(certificateId)
  DAL->>DB: SELECT sanitized public columns WHERE certificate_id = $1
  alt Certificate not found
    DB-->>DAL: null
    API-->>VerifyUI: 404 Not Found
    VerifyUI-->>Verifier: Display "Unrecognized Credential" badge
  else Certificate exists
    DB-->>DAL: PublicVerificationRecord
    API->>Crypto: verifyCertificateSignature(record)
    Crypto-->>API: signatureValid (boolean, timing-safe)
    API-->>VerifyUI: 200 OK { valid: signatureValid && status === 'active', status, sanitizedMetadata }
    VerifyUI-->>Verifier: Render VERIFIED or REVOKED badge + public details (zero private data)
  end
```

---

## 10. Credential Revocation & Ledger Auditing

Chapter officers can audit all issued credentials and revoke compromised or erroneously issued certificates with a mandatory audit reason.

```mermaid
sequenceDiagram
  autonumber
  actor Officer as Chapter Officer
  participant LedgerUI as /academy/admin/ledger
  participant API as /api/v1/admin/ledger
  participant DAL as ICertificateRepository
  participant DB as PostgreSQL (certificates)

  Officer->>LedgerUI: View issued certificate ledger & filter by status/committee
  LedgerUI->>API: GET /api/v1/admin/ledger
  API->>DAL: listLedgerEntries(filter)
  DAL->>DB: SELECT certificates (RLS: officer)
  DB-->>LedgerUI: Render ledger table
  Officer->>LedgerUI: Select "Revoke Credential" & provide mandatory reason
  LedgerUI->>API: POST /api/v1/admin/ledger/[certificateId]/revoke
  API->>API: Verify signed chapter_officer claim & reason length >= 5
  API->>DAL: revokeCertificate(certificateId, officerId, reason)
  DAL->>DB: UPDATE certificates SET status = 'revoked', revoked_by_officer = officerId, revoked_at = NOW(), revocation_reason = reason
  DB-->>DAL: Revoked CertificateRecord
  DAL-->>LedgerUI: 200 OK (Status immediately reflected as REVOKED on /verify/[certificateId])
```

