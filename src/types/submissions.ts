export type SubmissionPlatform =
  | 'GOOGLE_DRIVE'
  | 'CANVA'
  | 'FIGMA'
  | 'YOUTUBE'
  | 'OTHER_APPROVED';

export type ReviewGrade =
  | 'PENDING_REVIEW'
  | 'CHANGES_REQUESTED'
  | 'PASSED'
  | 'FAILED';

export interface SubmissionRevision {
  revisionNumber: number;
  submissionUrl: string;
  platform: SubmissionPlatform;
  submittedAt: string;
  notes?: string;
}

export interface SubmissionReview {
  id: string;
  submissionId: string;
  reviewerId: string;
  grade: ReviewGrade;
  feedbackNotes: string;
  reviewedAt: string;
}

export interface ExternalSubmission {
  id: string;
  studentId: string;
  courseSlug: string;
  projectTitle: string;
  projectDescription?: string;
  platform: SubmissionPlatform;
  submissionUrl: string;
  accessibilityConfirmed: boolean;
  status: ReviewGrade;
  currentRevision: number;
  revisions: SubmissionRevision[];
  reviews: SubmissionReview[];
  submittedAt: string;
  updatedAt: string;
}
