import { NextRequest } from 'next/server';
import { apiSuccess, apiError } from '@/lib/api/response';
import { ExternalSubmissionInputSchema } from '@/lib/validation/submissionSchemas';

// Simulated in-memory store for active session demonstrations before Supabase DB wiring
let demoSubmission: any = null;

export async function GET(request: NextRequest) {
  return apiSuccess(demoSubmission);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate payload with Zod
    const validation = ExternalSubmissionInputSchema.safeParse(body);
    if (!validation.success) {
      const errorMessage = validation.error.errors.map((e) => e.message).join(', ');
      return apiError(`Invalid submission payload: ${errorMessage}`, 400);
    }

    const { courseSlug, projectTitle, platform, submissionUrl, projectDescription } = validation.data;

    // Check if revision or initial submission
    if (demoSubmission && demoSubmission.courseSlug === courseSlug) {
      const nextRevNumber = demoSubmission.currentRevision + 1;
      demoSubmission.revisions.unshift({
        revisionNumber: demoSubmission.currentRevision,
        submissionUrl: demoSubmission.submissionUrl,
        platform: demoSubmission.platform,
        submittedAt: demoSubmission.submittedAt,
        notes: demoSubmission.projectDescription,
      });

      demoSubmission.projectTitle = projectTitle;
      demoSubmission.platform = platform;
      demoSubmission.submissionUrl = submissionUrl;
      demoSubmission.projectDescription = projectDescription;
      demoSubmission.status = 'PENDING_REVIEW';
      demoSubmission.currentRevision = nextRevNumber;
      demoSubmission.updatedAt = new Date().toISOString();
    } else {
      demoSubmission = {
        id: `sub-${Date.now()}`,
        studentId: 'std-demo-user',
        courseSlug,
        projectTitle,
        projectDescription,
        platform,
        submissionUrl,
        accessibilityConfirmed: true,
        status: 'PENDING_REVIEW',
        currentRevision: 1,
        revisions: [],
        reviews: [],
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    return apiSuccess(demoSubmission, 201);
  } catch (error: any) {
    return apiError(error?.message || 'Failed to process project submission', 500);
  }
}
