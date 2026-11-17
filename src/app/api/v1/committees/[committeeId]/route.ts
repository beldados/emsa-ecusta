import { NextRequest } from 'next/server';
import { committeeRepo } from '@/lib/dal';
import { apiSuccess, apiError } from '@/lib/api/response';
import { CommitteeSlug } from '@/types/committees';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ committeeId: string }> | { committeeId: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const committeeSlug = resolvedParams.committeeId as CommitteeSlug;

    const committee = await committeeRepo.getCommitteeBySlug(committeeSlug);
    if (!committee) {
      return apiError(`Committee '${committeeSlug}' not found`, 404);
    }

    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get('batchId') || undefined;

    const [leadership, projects] = await Promise.all([
      committeeRepo.getLeadership(committeeSlug, batchId),
      committeeRepo.getProjects(committeeSlug, batchId),
    ]);

    return apiSuccess({
      committee,
      leadership,
      projects,
    });
  } catch (error: any) {
    return apiError(error.message || 'Failed to retrieve committee details', 500);
  }
}
