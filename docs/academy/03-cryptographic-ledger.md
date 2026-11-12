# 03 — Deterministic Cryptographic Credential Ledger

> **Document Scope:** Cryptographic signing specification, canonical payload format, and zero-authentication public verification protocol for EMSA Academy certificates.

---

## 1. Cryptographic Design Objectives

EMSA Academy credentials must be **tamper-evident**, **independently verifiable by third parties**, and **privacy-preserving**:

1. **Deterministic Signing:** Recomputing the signature from the stored canonical certificate attributes always produces the identical HMAC-SHA-256 digest for a given key version.
2. **Zero-Trust Client Separation:** Signing secrets exist exclusively in server-side runtime environment variables (`CERTIFICATE_SIGNING_SECRET`) and are never bundled into client JavaScript or exposed to Supabase anon roles.
3. **Live Revocation Authority:** Even when a cryptographic signature is mathematically valid, the public verification terminal cross-checks `certificates.status` (`active` vs `revoked`) in PostgreSQL so compromised or erroneously issued credentials can be invalidated immediately.

---

## 2. HMAC-SHA-256 Signing Engine

All cryptographic operations reside in `src/lib/crypto/`.

### 2.1 Canonical Payload Specification

Every certificate signature is computed over an exact, pipe-delimited (`|`) UTF-8 string containing five normalized fields in fixed order:

```text
certificateId|recipientName|courseTitle|issueDateISO|institution
```

#### Field Normalization Rules
| Position | Field | Format & Normalization Rule | Example |
| :--- | :--- | :--- | :--- |
| `1` | `certificateId` | Uppercase trimmed identifier | `EMSA-SCOME-2026-00042` |
| `2` | `recipientName` | Trimmed NFC-normalized full name (`String.prototype.normalize('NFC').trim()`) | `Abebe Kebede` |
| `3` | `courseTitle` | Trimmed exact course title | `Foundations of Medical Education` |
| `4` | `issueDateISO` | Canonical UTC ISO-8601 timestamp (`YYYY-MM-DDTHH:mm:ss.sssZ`) | `2026-11-11T14:30:00.000Z` |
| `5` | `institution` | Fixed institutional authority string | `EMSA-ECUSTA` |

> **Delimiter Safety:** Pipe characters (`|`) are disallowed or stripped during recipient/course canonicalization so field boundaries cannot be spoofed via delimiter injection.

### 2.2 Signature Generation & Timing-Safe Verification

```ts
// Conceptual specification — implemented in src/lib/crypto/
import { createHmac, timingSafeEqual } from 'node:crypto';

export function buildCanonicalPayload(input: {
  certificateId: string;
  recipientName: string;
  courseTitle: string;
  issueDateISO: string;
  institution: string;
}): string {
  return [
    input.certificateId.trim().toUpperCase(),
    input.recipientName.normalize('NFC').trim(),
    input.courseTitle.normalize('NFC').trim(),
    new Date(input.issueDateISO).toISOString(),
    input.institution.trim(),
  ].join('|');
}

export function signCertificatePayload(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload, 'utf8').digest('hex');
}

export function verifyCertificateSignature(
  payload: string,
  expectedHexSignature: string,
  secret: string
): boolean {
  const computed = signCertificatePayload(payload, secret);
  const a = Buffer.from(computed, 'hex');
  const b = Buffer.from(expectedHexSignature, 'hex');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
```

### 2.3 Key Versioning & Rotation
- Each row in `public.certificates` records `key_version` (default `1`).
- Key rotation introduces `CERTIFICATE_SIGNING_SECRET_V2` without invalidating historical `key_version = 1` certificates, allowing the verification engine to select the matching server secret by `key_version`.

---

## 3. Public Verification Specification (`/verify/[certificateId]`)

### 3.1 Endpoints & Routes
- **Human Verification Terminal:** `GET /verify/[certificateId]` (`src/app/(public)/verify/[certificateId]/`)
- **Machine-Readable Verification API:** `GET /api/v1/verify/[certificateId]` (`src/app/api/v1/verify/[certificateId]/`)
- **Authentication Required:** **None (Zero-Auth Public Endpoint)**

### 3.2 Verification Decision Matrix

| Record Found? | HMAC Signature Valid? | Ledger `status` | Returned Badge State | HTTP Status |
| :--- | :--- | :--- | :--- | :--- |
| No | N/A | N/A | `NOT_FOUND` (Unrecognized Credential) | `404` |
| Yes | `false` | Any | `INVALID_SIGNATURE` (Integrity Failure) | `200` (with `valid: false`) |
| Yes | `true` | `revoked` | `REVOKED` (Credential Revoked) | `200` (with `valid: false`) |
| Yes | `true` | `active` | `VERIFIED` (Authentic & Active) | `200` (with `valid: true`) |

### 3.3 Sanitized Public Response Contract

To uphold student privacy, the public verification endpoint returns **only** credential verification metadata:

```json
{
  "certificateId": "EMSA-SCOME-2026-00042",
  "verificationState": "VERIFIED",
  "cryptographicCheck": {
    "algorithm": "HMAC-SHA-256",
    "signatureValid": true,
    "keyVersion": 1
  },
  "credential": {
    "recipientName": "Abebe Kebede",
    "courseTitle": "Foundations of Medical Education",
    "committeeSlug": "scome",
    "institution": "EMSA-ECUSTA",
    "issueDateISO": "2026-11-11T14:30:00.000Z",
    "status": "active",
    "revokedAt": null
  }
}
```

### 3.4 Strict Privacy Redactions (Must NEVER Be Exposed Publicly)
The public verification terminal and `/api/v1/verify/[certificateId]` **must never** return:
- Student institutional email (`@ecusta.edu.et`)
- Registrar `student_id_number` or internal `student_id` UUID
- External capstone submission URLs
- Officer `submission_reviews` grades or internal feedback notes
- Issuing/revoking officer personal identifiers (`issued_by_officer`, `revoked_by_officer`)
- Internal `revocation_reason` notes (only `status: "revoked"` and `revokedAt` timestamp are exposed publicly)

