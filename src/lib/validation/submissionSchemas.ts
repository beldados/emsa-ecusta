import { z } from 'zod';

export const SubmissionPlatformSchema = z.enum([
  'GOOGLE_DRIVE',
  'CANVA',
  'FIGMA',
  'YOUTUBE',
  'OTHER_APPROVED',
]);

export const ReviewGradeSchema = z.enum([
  'PENDING_REVIEW',
  'CHANGES_REQUESTED',
  'PASSED',
  'FAILED',
]);

export const ExternalSubmissionInputSchema = z.object({
  courseSlug: z.string().min(1),
  projectTitle: z.string().min(5).max(120),
  platform: SubmissionPlatformSchema,
  submissionUrl: z
    .string()
    .url()
    .refine((url) => url.startsWith('https://'), {
      message: 'Submission URL must use secure HTTPS protocol',
    }),
  projectDescription: z.string().max(500).optional(),
  accessibilityConfirmed: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm link accessibility for reviewers' }),
  }),
});

export const SubmissionReviewInputSchema = z.object({
  submissionId: z.string().min(1),
  grade: z.enum(['CHANGES_REQUESTED', 'PASSED', 'FAILED']),
  feedbackNotes: z.string().min(5),
});

export const SubmissionRevisionSchema = z.object({
  revisionNumber: z.number().int().positive(),
  submissionUrl: z.string().url(),
  platform: SubmissionPlatformSchema,
  submittedAt: z.string(),
  notes: z.string().optional(),
});

export const SubmissionReviewSchema = z.object({
  id: z.string().min(1),
  submissionId: z.string().min(1),
  reviewerId: z.string().min(1),
  grade: ReviewGradeSchema,
  feedbackNotes: z.string().min(1),
  reviewedAt: z.string(),
});

export const ExternalSubmissionSchema = z.object({
  id: z.string().min(1),
  studentId: z.string().min(1),
  courseSlug: z.string().min(1),
  projectTitle: z.string().min(1),
  projectDescription: z.string().optional(),
  platform: SubmissionPlatformSchema,
  submissionUrl: z.string().url(),
  accessibilityConfirmed: z.boolean(),
  status: ReviewGradeSchema,
  currentRevision: z.number().int().positive(),
  revisions: z.array(SubmissionRevisionSchema),
  reviews: z.array(SubmissionReviewSchema),
  submittedAt: z.string(),
  updatedAt: z.string(),
});
