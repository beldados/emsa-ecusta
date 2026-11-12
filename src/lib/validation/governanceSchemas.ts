import { z } from 'zod';

export const AcademicBatchTierSchema = z.enum([
  'Pre-Clinical Year I',
  'Pre-Clinical Year II',
  'Clinical Year I',
  'Clinical Year II',
  'Internship',
  'Alumni',
]);

export const TenureStatusSchema = z.enum(['active', 'archived', 'frozen']);

export const SocialLinksSchema = z.object({
  telegram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  email: z.string().email(),
});

export const AcademicTenureSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  status: TenureStatusSchema,
  isCurrent: z.boolean(),
  themeStatement: z.string().optional(),
  annualReportUrl: z.string().optional(),
  annualReportSize: z.string().optional(),
});

export const ExecutiveOfficerSchema = z.object({
  id: z.string().min(1),
  batchId: z.string().min(1),
  fullName: z.string().min(2),
  role: z.string().min(2),
  batchTier: AcademicBatchTierSchema,
  portraitPath: z.string().min(1),
  socialLinks: SocialLinksSchema,
  rankOrder: z.number().int().nonnegative(),
});

export const CoreValueSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const HealthcareAffiliateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  shortName: z.string().min(1),
  category: z.enum([
    'university',
    'national_association',
    'international',
    'ministry',
    'hospital',
    'humanitarian',
  ]),
  logoPath: z.string().min(1),
  websiteUrl: z.string().url(),
});
