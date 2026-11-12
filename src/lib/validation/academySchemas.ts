import { z } from 'zod';

export const TrackCategorySchema = z.enum([
  'GRAPHIC DESIGN',
  'PHOTOGRAPHY',
  'VIDEO PRODUCTION',
  'LEADERSHIP',
]);

export const EnrollmentStatusSchema = z.enum([
  'IN_PROGRESS',
  'SUBMITTED',
  'COMPLETED',
  'DROPPED',
]);

export const AcademyLessonSchema = z.object({
  id: z.string().min(1),
  lessonNumber: z.number().int().positive(),
  title: z.string().min(1),
  moduleGroup: z.string().min(1),
  duration: z.string().min(1),
  youtubeVideoId: z.string().min(1),
  summary: z.string().optional(),
  readingNotes: z.string().optional(),
});

export const AcademyModuleSchema = z.object({
  moduleNumber: z.number().int().positive(),
  title: z.string().min(1),
  lessons: z.array(AcademyLessonSchema),
});

export const CapstoneSpecSchema = z.object({
  title: z.string().min(1),
  instructions: z.string().min(1),
  rubricSummary: z.array(z.string()),
  supportedPlatforms: z.array(z.string()),
});

export const AcademyCourseSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  trackCategory: TrackCategorySchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  totalLessons: z.number().int().positive(),
  capstoneSpec: CapstoneSpecSchema,
  modules: z.array(AcademyModuleSchema),
});

export const StudentProgressSchema = z.object({
  studentId: z.string().min(1),
  courseSlug: z.string().min(1),
  completedLessonIds: z.array(z.string()),
  progressPercent: z.number().min(0).max(100),
  isFullyCompleted: z.boolean(),
  updatedAt: z.string(),
});
