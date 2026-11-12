export type TrackCategory =
  | 'GRAPHIC DESIGN'
  | 'PHOTOGRAPHY'
  | 'VIDEO PRODUCTION'
  | 'LEADERSHIP';

export type EnrollmentStatus =
  | 'IN_PROGRESS'
  | 'SUBMITTED'
  | 'COMPLETED'
  | 'DROPPED';

export interface AcademyLesson {
  id: string; // e.g. "lesson-01-design-advocacy"
  lessonNumber: number;
  title: string;
  moduleGroup: string; // e.g. "01 Foundations", "02 Visual communication"
  duration: string; // e.g. "08:40"
  youtubeVideoId: string; // YouTube embed ID
  summary?: string;
  readingNotes?: string;
}

export interface AcademyModule {
  moduleNumber: number;
  title: string;
  lessons: AcademyLesson[];
}

export interface CapstoneSpec {
  title: string;
  instructions: string;
  rubricSummary: string[];
  supportedPlatforms: string[];
}

export interface AcademyCourse {
  id: string;
  slug: string; // e.g. "graphic-design-health-advocacy"
  trackCategory: TrackCategory;
  title: string;
  summary: string;
  description: string;
  totalLessons: number;
  capstoneSpec: CapstoneSpec;
  modules: AcademyModule[];
}

export interface StudentProgress {
  studentId: string;
  courseSlug: string;
  completedLessonIds: string[];
  progressPercent: number;
  isFullyCompleted: boolean;
  updatedAt: string;
}
