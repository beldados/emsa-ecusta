import { NextRequest } from 'next/server';
import { academyRepo } from '@/lib/dal';
import { apiSuccess, apiError } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    const courses = await academyRepo.getAllCourses();
    return apiSuccess(courses);
  } catch (error: any) {
    return apiError(error.message || 'Failed to retrieve courses', 500);
  }
}
