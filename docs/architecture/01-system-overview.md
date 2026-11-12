# 01 — System Overview & Architectural Boundaries

> **Document Scope:** High-level system architecture, functional domains, hybrid data strategy, and account/privilege boundaries for the **EMSA-ECUSTA Digital Portal & Academy LMS**.

---

## 1. Executive Summary

The **EMSA-ECUSTA Digital Portal & Academy LMS** unifies the public institutional presence of the **EMSA-ECUSTA Medical Students' Association** with an accredited internal medical learning management system (Academy) and a zero-auth cryptographic credential verification authority.

The platform is engineered around three core architectural principles:

1. **Hybrid Static + Transactional Persistence:** Low-churn editorial, governance, and curriculum metadata lives in version-controlled JSON files (`src/data/`), while high-churn student, progress, submission, and credential state lives in PostgreSQL (Supabase).
2. **Strict Data Access Isolation:** UI components and route handlers never read JSON files directly or embed raw SQL; all reads and writes pass through typed Data Access Layer (DAL) repository contracts (`src/lib/dal/`).
3. **Zero-Storage Academic Submissions & Deterministic Credentials:** Student capstone deliverables are submitted as validated external URLs rather than uploaded binaries, and graduation certificates are sealed with deterministic HMAC-SHA-256 signatures verifiable publicly without exposing private student records.

---

## 2. The Five Core Functional Areas

### 2.1 Institutional Governance
- Serves as the authoritative public entry point for EMSA-ECUSTA (`src/app/(public)/`).
- Presents the association's charter, executive board roster for the active tenure, official announcements, and institutional branding assets (`/public/assets/branding/`).
- Enforces separation between public editorial presentation and authenticated academic operations.

### 2.2 Six Standing Committees
- Dedicated operational and informational profiles under `/committees/[committeeId]` backed by `/public/assets/committees/`.
- Covers all six IFMSA-aligned standing committees:
  - **SCOME** — Standing Committee on Medical Education
  - **SCOPH** — Standing Committee on Public Health
  - **SCORA** — Standing Committee on Sexual and Reproductive Health and Rights including HIV and AIDS
  - **SCOPE** — Standing Committee on Professional Exchange
  - **SCORP** — Standing Committee on Human Rights and Peace
  - **SCORE** — Standing Committee on Research Exchange
- Each standing committee links to its leadership mandates, flagship initiatives, and associated EMSA Academy courses.

### 2.3 Living Archive (Multi-Batch Continuity)
- Preserves institutional memory across executive leadership cohorts under `/archive` (`src/app/(public)/archive/`).
- Organizes leadership portraits, project showcases, and historical records across three structured batch tiers:
  - `2026–2027` (`/public/assets/{leadership,projects,archive}/2026-2027/`)
  - `2025–2026` (`/public/assets/{leadership,projects,archive}/2025-2026/`)
  - `2024–2025` (`/public/assets/{leadership,projects,archive}/2024-2025/`)
- All batch navigation and display views resolve dynamically from structured archive records rather than hardcoded UI components.

### 2.4 EMSA Academy (LMS)
- **Public Discovery (`/academy/[courseSlug]`):** Unauthenticated course catalog, syllabus previews, learning objectives, and prerequisite metadata.
- **Authenticated Learning Space (`src/app/(student)/academy/`):**
  - `/academy/dashboard` — Enrollment overview, eligibility status, lesson completion percentages, and issued credentials.
  - `/academy/learn/[courseSlug]` — Distraction-free lesson player, checkpoint persistence, capstone unlock gate (at 100% lesson completion), and external URL capstone submission workflow.
- **Internal Officer Console (`src/app/(admin)/academy/admin/`):**
  - `/academy/admin/eligibility` — Manual registrar cross-reference and student account verification queue.
  - `/academy/admin/reviews` — Capstone submission evaluation, structured grading, and revision feedback.
  - `/academy/admin/ledger` — Issued certificate registry, audit trails, and credential revocation controls.

### 2.5 Cryptographic Credential Authority
- **Public Verification Terminal (`/verify/[certificateId]` & `/api/v1/verify/[certificateId]`):** Zero-authentication verification endpoint.
- Recomputes the deterministic HMAC-SHA-256 signature from canonical certificate fields and checks live revocation status in the PostgreSQL ledger.
- Returns sanitized public verification metadata and cryptographic validity badges without leaking student emails, institutional IDs, or internal reviewer notes.

---

## 3. System Context & Layer Topology

```text
+-------------------------------------------------------------------+
|                        Presentation Layer                         |
|  Next.js 14 App Router: (public) | (student) | (admin) | api/v1   |
+---------------------------------+---------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                   Data Access Layer (DAL)                         |
|  Contracts (src/lib/dal/contracts/)                               |
|  Adapters  (src/lib/dal/repositories/)                            |
+-----------------+-------------------------------+-----------------+
                  |                               |
                  v                               v
+---------------------------------+   +-----------------------------+
|   Version-Controlled Metadata   |   |   Transactional Persistence |
|   src/data/*.json               |   |   PostgreSQL / Supabase     |
|   - Standing committees         |   |   - profiles                |
|   - Living archive batches      |   |   - enrollments             |
|   - Course & lesson catalogs    |   |   - lesson_progress         |
|   - Governance rosters          |   |   - submissions & revisions |
+---------------------------------+   |   - submission_reviews      |
                                      |   - certificates & ledger   |
                                      +-----------------------------+
```

---

## 4. Hybrid Data Strategy

EMSA-ECUSTA intentionally splits data persistence by **volatility** and **trust boundary**:

| Data Category | Storage Engine | Examples | Rationale |
| :--- | :--- | :--- | :--- |
| **Institutional & Curriculum Metadata** | Version-controlled JSON (`src/data/`) | Committee descriptions, executive batch rosters, living archive entries, course syllabi, lesson outlines | Low-churn, peer-reviewed via Git pull requests, zero database round-trip overhead, cacheable at build/edge |
| **User, Academic & Ledger State** | PostgreSQL via Supabase | Student profiles, eligibility approvals, enrollments, lesson checkpoints, capstone URLs, revision logs, officer reviews, cryptographic certificates | High-churn, requires ACID transactions, Row-Level Security (RLS), audit logging, and foreign-key integrity |

> **Design Rule:** JSON metadata files carry stable identifiers (`courseSlug`, `lessonId`, `committeeId`, `batchId`). PostgreSQL tables reference those stable string slugs/identifiers so curriculum content can be updated in Git without breaking relational progress or certificate records.

---

## 5. Account & Privilege Boundaries

### 5.1 Single Public Account Type (`STUDENT`)
- Public self-registration creates **exactly one account type: `STUDENT`**.
- Registration is strictly gated by the institutional email domain (`@ecusta.edu.et`).
- Unverified students may authenticate, view their pending status, and browse public catalog metadata, but cannot enroll in courses or submit capstones until `eligibility_status` transitions to `verified`.

### 5.2 Internal Chapter Officer Claims (Non-Public)
- **Administrative and grading capabilities are NOT student-facing roles** and cannot be self-selected during sign-up or modified via student profile endpoints.
- Internal chapter officers (Executive Board, Academy Directors, Committee Reviewers) are provisioned out-of-band via the `chapter_officers` registry and authenticated through **signed administrative JWT claims** (verified server-side and enforced in PostgreSQL RLS).
- Privilege separation rules:
  1. Students can read and mutate only their own `lesson_progress` and `submissions` (within state-machine rules).
  2. Only authenticated chapter officers with valid administrative claims can mutate `eligibility_status`, insert `submission_reviews`, issue `certificates`, or revoke credentials.
  3. Public visitors require zero authentication to inspect `/committees/*`, `/archive`, `/academy/[courseSlug]`, and `/verify/[certificateId]`.

