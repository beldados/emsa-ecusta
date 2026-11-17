import { NextRequest } from 'next/server';
import { committeeRepo } from '@/lib/dal';
import { apiSuccess, apiError } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    const committees = await committeeRepo.getAllCommittees();
    return apiSuccess(committees);
  } catch (error: any) {
    return apiError(error.message || 'Failed to retrieve committees', 500);
  }
}
