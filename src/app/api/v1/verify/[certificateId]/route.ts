import { NextRequest } from 'next/server';
import { certificateRepo } from '@/lib/dal';
import { apiSuccess, apiError } from '@/lib/api/response';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ certificateId: string }> | { certificateId: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const { certificateId } = resolvedParams;

    const verification = await certificateRepo.verifyCertificate(certificateId);

    if (!verification) {
      return apiError(
        'CERTIFICATE_NOT_FOUND',
        `No official credential record exists with identifier '${certificateId}'.`,
        404
      );
    }

    return apiSuccess(verification);
  } catch (error) {
    return apiError('VERIFICATION_SERVER_ERROR', 'Failed to execute ledger verification', 500, error);
  }
}
