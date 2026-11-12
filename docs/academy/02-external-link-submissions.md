# 02 — External Link Project Submissions & Zero-Storage Policy

> **Document Scope:** Security architecture, platform allowlists, URL validation rules, SSRF prevention, and immutable revision lifecycle for EMSA Academy capstone submissions.

---

## 1. Zero-Storage Policy

The **EMSA Academy LMS does NOT store, upload, stream, or proxy student project binaries** (PDFs, PowerPoint decks, MP4 videos, Figma exports, or ZIP archives).

### Architectural Rationale
1. **Zero Malware / Arbitrary File Execution Surface:** Eliminates server-side virus scanning, MIME-spoofing risks, and executable payload storage.
2. **Predictable Infrastructure Costs:** Prevents unbounded object-storage growth from clinical video presentations or high-resolution slide decks.
3. **Portfolio Portability:** Students retain direct ownership of their work in their institutional or personal cloud workspaces while submitting verifiable links for officer evaluation.

> **Hard Constraint:** No file-upload `<input type="file">`, multipart binary handler, or Supabase Storage bucket may be created for student capstone deliverables.

---

## 2. Supported External Platforms

Students must select a target `submission_platform` enum value matching the submitted URL:

| Platform Enum | Display Name | Approved Hostnames | Typical Deliverable Format |
| :--- | :--- | :--- | :--- |
| `google_drive` | **Google Drive / Docs** | `drive.google.com`, `docs.google.com` | Clinical case reports, slide decks, PDF briefs |
| `canva` | **Canva** | `canva.com`, `www.canva.com` | Public health infographics, campaign posters, presentations |
| `figma` | **Figma** | `figma.com`, `www.figma.com` | Health-tech UI prototypes, medical workflow diagrams |
| `youtube` | **YouTube** | `youtube.com`, `www.youtube.com`, `youtu.be` | Unlisted clinical demonstration or community outreach videos |
| `other_approved` | **Other Approved** | Explicitly allowlisted academic/institutional domains (e.g., `github.com`, `osf.io`, `ecusta.edu.et`) | Open-source clinical tools, research preprints, institutional repositories |

---

## 3. Server-Side URL Validation & Security Controls

Client-side validation is strictly advisory; **all security checks execute server-side** inside `src/lib/validation/` before persisting to PostgreSQL.

### 3.1 Protocol & Structural Enforcement
1. **Strict HTTPS Only:** Reject `http://`, `javascript:`, `data:`, `vbscript:`, `file://`, and `ftp://`.
2. **No Embedded Credentials:** Reject URLs containing `username` or `password` segments (`https://user:pass@host`).
3. **Length Ceiling:** Maximum URL length of `2048` characters; reject whitespace or control characters.
4. **Canonical Parsing:** Parse exclusively via the standard WHATWG `new URL(rawUrl)` parser (never naive regex-only parsing).

### 3.2 Domain Allowlist Regexes
Each `submission_platform` maps to a strict hostname + path pattern checked against `parsedUrl.hostname.toLowerCase()`:

```ts
// Conceptual validation specification — implemented in src/lib/validation/
const PLATFORM_HOST_RULES: Record<SubmissionPlatform, RegExp> = {
  google_drive: /^(drive|docs)\.google\.com$/,
  canva: /^(www\.)?canva\.com$/,
  figma: /^(www\.)?figma\.com$/,
  youtube: /^(www\.)?(youtube\.com|youtu\.be)$/,
  other_approved: /^(github\.com|osf\.io|([a-z0-9-]+\.)*ecusta\.edu\.et)$/,
};
```

- Subdomain wildcards are disallowed except where explicitly anchored (e.g., `ecusta.edu.et`).
- URL shorteners outside `youtu.be` (such as `bit.ly`, `tinyurl.com`, `t.co`) are **strictly rejected** to prevent open-redirect obfuscation.

### 3.3 SSRF (Server-Side Request Forgery) Prevention
1. **Zero Server-Side Fetching:** The EMSA-ECUSTA backend **must NEVER** issue HTTP `GET`/`HEAD` requests, OpenGraph scrapers, link-preview unfurlers, or headless browser renders against student-submitted URLs.
2. **Private & Loopback IP Rejection:** Explicitly reject IPv4/IPv6 literals and private ranges (`127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.0.0/16`, `::1`, `fc00::/7`, `localhost`, `*.local`).
3. **Safe Officer Rendering:** In `/academy/admin/reviews`, officer reviewers open the validated URL in a new tab using `rel="noopener noreferrer"` and never render external links inside privileged `<iframe>` contexts.

---

## 4. Immutable Revision Lifecycle (`n + 1`)

To preserve full academic auditability, submitted links and officer feedback are **never overwritten in place**:

```text
  [Capstone Unlocked (100% Lessons)]
                 │
                 ▼
    Submit Initial Link (Revision 1)
    - submissions.current_revision = 1
    - submission_revisions += { revision_number: 1, url_1 }
                 │
                 ▼
       Officer Reviews Revision 1
       ├── pass / distinction ──► Issue Cryptographic Certificate
       ├── fail               ──► Terminal Fail Recorded
       └── changes_requested  ──► Student Submits Revision n + 1
                                     │
                                     ▼
                    Submit Updated Link (Revision 2)
                    - submissions.current_revision = 2
                    - submissions.current_url = url_2
                    - submission_revisions += { revision_number: 2, url_2 }
                    (Revision 1 + Review 1 remain immutable)
```

### Revision Integrity Guarantees
1. **Monotonic Sequence:** Revision numbers increment strictly (`1, 2, 3, ...`) enforced by `UNIQUE (submission_id, revision_number)` in PostgreSQL.
2. **Append-Only Audit Trail:** `submission_revisions` and `submission_reviews` have no `UPDATE` or `DELETE` RLS policies; prior links and officer notes cannot be altered retroactively.
3. **Submission Lock During Active Review:** Once a revision is submitted, the student cannot submit revision `n + 1` until an officer records `changes_requested` against revision `n`.

