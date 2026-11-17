import { NextRequest } from 'next/server';
import { governanceRepo } from '@/lib/dal';
import { apiSuccess, apiError } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get('batchId') || undefined;

    const [tenures, activeTenure, executiveBoard, coreValues, affiliates] = await Promise.all([
      governanceRepo.getTenures(),
      governanceRepo.getActiveTenure(),
      governanceRepo.getExecutiveBoard(batchId),
      governanceRepo.getCoreValues(),
      governanceRepo.getAffiliates(),
    ]);

    return apiSuccess({
      tenures,
      activeTenure,
      executiveBoard,
      coreValues,
      affiliates,
    });
  } catch (error: any) {
    return apiError(error.message || 'Failed to retrieve governance data', 500);
  }
}
