import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { certificateRepo } from '@/lib/dal';
import { Container } from '@/components/ui/container';
import {
  CertificateDocument,
  CertificateActionControls,
  LedgerAuditCard,
} from '@/components/features/credentials';

interface VerifyPageProps {
  params: Promise<{ certificateId: string }> | { certificateId: string };
}

export async function generateStaticParams() {
  const certs = await certificateRepo.getAllCertificates();
  return certs.map((c) => ({
    certificateId: c.certificateId,
  }));
}

export async function generateMetadata({ params }: VerifyPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const { certificateId } = resolvedParams;
  const cert = await certificateRepo.getCertificateById(certificateId);

  if (!cert) return { title: 'Credential Not Found | EMSA-ECUSTA' };

  return {
    title: `Verify ${cert.certificateId} | EMSA-ECUSTA`,
    description: `Official verification record for ${cert.recipientName} - ${cert.courseTitle}`,
  };
}

export default async function VerifyCertificatePage({ params }: VerifyPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const { certificateId } = resolvedParams;

  // Retrieve certificate and compute cryptographic verification
  const [certificate, verification] = await Promise.all([
    certificateRepo.getCertificateById(certificateId),
    certificateRepo.verifyCertificate(certificateId),
  ]);

  if (!certificate || !verification) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-canvas py-10 certificate-print-wrap">
      <Container>
        {/* Action Controls Bar (Print PDF, Share, Back) */}
        <CertificateActionControls certificateId={certificate.certificateId} />

        {/* Page 12 Split Layout: Certificate Canvas (Left) + Audit Ledger Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Certificate Presentation Document (7 cols) */}
          <div className="lg:col-span-7 flex justify-center">
            <CertificateDocument certificate={certificate} />
          </div>

          {/* Right: Credential Authentication Audit Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <LedgerAuditCard verification={verification} />
          </div>
        </div>
      </Container>
    </div>
  );
}
