import { z } from 'zod';
import { AcademicBatchTierSchema, SocialLinksSchema } from './governanceSchemas';

export const CommitteeSlugSchema = z.enum([
  'scome',
  'scoph',
  'scora',
  'scope',
  'scorp',
  'score',
]);

export const ProjectFormatTypeSchema = z.enum([
  'field_campaign',
  'digital_resource',
  'workshop',
  'academic_symposium',
  'hybrid',
]);

export const ProjectImpactMetricSchema = z.object({
  count: z.number().nonnegative(),
  label: z.string().min(1),
});

export const StandingCommitteeSchema = z.object({
  id: CommitteeSlugSchema,
  acronym: z.string().min(2),
  name: z.string().min(2),
  shortDescription: z.string().min(10),
  fullMission: z.string().min(10),
  colorTheme: z.object({
    primary: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
    badgeBg: z.string(),
    accentGlow: z.string(),
  }),
  telegramJoinUrl: z.string().url(),
});

export const CommitteeLeadershipMemberSchema = z.object({
  id: z.string().min(1),
  batchId: z.string().min(1),
  committeeSlug: CommitteeSlugSchema,
  isDirector: z.boolean(),
  officialTitle: z.string().min(2),
  fullName: z.string().min(2),
  batchTier: AcademicBatchTierSchema,
  portraitPath: z.string().min(1),
  socialLinks: SocialLinksSchema,
  rankOrder: z.number().int().nonnegative(),
});

export const CommitteeProjectSchema = z.object({
  id: z.string().min(1),
  batchId: z.string().min(1),
  committeeSlug: CommitteeSlugSchema,
  title: z.string().min(3),
  slug: z.string().min(3),
  campaignType: z.string().min(2),
  formatType: ProjectFormatTypeSchema,
  eventDate: z.string().min(2),
  summary: z.string().min(5),
  longDescription: z.string().optional(),
  externalUrl: z.string().url().optional(),
  partnerOrganization: z.string().min(2),
  impactMetrics: z.array(ProjectImpactMetricSchema),
  coverImagePath: z.string().min(1),
  galleryImages: z.array(z.string()),
});

export const BatchActivityPhotoSchema = z.object({
  id: z.string().min(1),
  imagePath: z.string().min(1),
  caption: z.string().min(1),
});

export const BatchGallerySchema = z.object({
  id: z.string().min(1),
  batchId: z.string().min(1),
  committeeSlug: CommitteeSlugSchema.optional(),
  title: z.string().min(1),
  photos: z.array(BatchActivityPhotoSchema),
});
