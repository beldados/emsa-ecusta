import { NextRequest } from 'next/server';
import { archiveRepo } from '@/lib/dal';
import { apiSuccess, apiError } from '@/lib/api/response';
import { CommitteeSlug } from '@/types/committees';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get('batchId') || undefined;
    const committeeSlug = (searchParams.get('committeeSlug') as CommitteeSlug | 'all') || undefined;
    const term = searchParams.get('q') || searchParams.get('term') || undefined;

    // If search/filter parameters are provided, search projects
    if (batchId || committeeSlug || term) {
      const projects = await archiveRepo.searchProjects({
        batchId,
        committeeSlug,
        term,
      });

      return apiSuccess({
        isSearch: true,
        count: projects.length,
        projects,
      });
    }

    // Otherwise return full archive timeline
    const archives = await archiveRepo.getAllArchives();
    return apiSuccess(archives);
  } catch (error: any) {
    return apiError(error.message || 'Failed to retrieve archive data', 500);
  }
}
