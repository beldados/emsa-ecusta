import { NextRequest } from 'next/server';
import { academyRepo } from '@/lib/dal';
import { apiSuccess, apiError } from '@/lib/api/response';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ courseSlug: string }> | { courseSlug: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const courseSlug = resolvedParams.courseSlug;

    const course = await academyRepo.getCourseBySlug(courseSlug);
    if (!course) {
      return apiError(`Course with slug '${courseSlug}' not found`, 404);
    }

    const lessons = await academyRepo.getCourseLessons(courseSlug);

    return apiSuccess({
      course,
      lessons,
    });
  } catch (error: any) {
    return apiError(error.message || 'Failed to retrieve course details', 500);
  }
}
