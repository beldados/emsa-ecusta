import { z } from 'zod';

export const CertificateStatusSchema = z.enum(['ACTIVE', 'REVOKED']);

export const CanonicalCertificatePayloadSchema = z.object({
  certificateId: z.string().min(1),
  recipientName: z.string().min(1),
  courseTitle: z.string().min(1),
  issueDateISO: z.string().min(1),
  institution: z.string().min(1),
});

export const CertificateRecordSchema = z.object({
  id: z.string().min(1),
  certificateId: z.string().min(1),
  studentId: z.string().min(1),
  courseSlug: z.string().min(1),
  recipientName: z.string().min(1),
  courseTitle: z.string().min(1),
  issueDate: z.string().min(1),
  issueDateISO: z.string().min(1),
  status: CertificateStatusSchema,
  cryptographicHash: z.string().length(64),
  qrCodeDataUrl: z.string().optional(),
  revocationReason: z.string().optional(),
  revokedAt: z.string().optional(),
});

export const PublicVerificationResultSchema = z.object({
  certificateId: z.string().min(1),
  recipientDisplay: z.string().min(1),
  institution: z.string().min(1),
  courseTitle: z.string().min(1),
  issueDate: z.string().min(1),
  recordStatus: z.enum(['Active • Non-Revoked', 'Revoked']),
  cryptographicHash: z.string().length(64),
  isAuthentic: z.boolean(),
});
