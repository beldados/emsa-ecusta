export type CertificateStatus = 'ACTIVE' | 'REVOKED';

export interface CanonicalCertificatePayload {
  certificateId: string;
  recipientName: string;
  courseTitle: string;
  issueDateISO: string;
  institution: string;
}

export interface CertificateRecord {
  id: string;
  certificateId: string; // e.g. "ECUSTA-CERT-88492X"
  studentId: string;
  courseSlug: string;
  recipientName: string;
  courseTitle: string;
  issueDate: string; // e.g. "November 2026"
  issueDateISO: string;
  status: CertificateStatus;
  cryptographicHash: string; // SHA-256 hex string
  qrCodeDataUrl?: string;
  revocationReason?: string;
  revokedAt?: string;
}

export interface PublicVerificationResult {
  certificateId: string;
  recipientDisplay: string;
  institution: string;
  courseTitle: string;
  issueDate: string;
  recordStatus: 'Active • Non-Revoked' | 'Revoked';
  cryptographicHash: string;
  isAuthentic: boolean;
}
