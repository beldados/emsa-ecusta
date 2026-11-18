import certificatesData from '@/data/certificates.json';
import { ICertificateRepository } from '../contracts/ICertificateRepository';
import { CertificateRecord, PublicVerificationResult } from '@/types/credentials';
import { verifyCertificateIntegrity } from '@/lib/crypto/certificateSigner';

export class JsonCertificateRepository implements ICertificateRepository {
  async getAllCertificates(): Promise<CertificateRecord[]> {
    return certificatesData.certificates as CertificateRecord[];
  }

  async getCertificateById(certificateId: string): Promise<CertificateRecord | null> {
    const cert = certificatesData.certificates.find(
      (c) => c.certificateId.toUpperCase() === certificateId.trim().toUpperCase()
    );
    return (cert as CertificateRecord) || null;
  }

  async verifyCertificate(certificateId: string): Promise<PublicVerificationResult | null> {
    const cert = await this.getCertificateById(certificateId);
    if (!cert) return null;

    // Verify cryptographic integrity
    const isAuthentic = verifyCertificateIntegrity(
      {
        certificateId: cert.certificateId,
        recipientName: cert.recipientName,
        courseTitle: cert.courseTitle,
        issueDateISO: cert.issueDateISO,
        institution: 'EMSA-ECUSTA',
      },
      cert.cryptographicHash
    );

    return {
      certificateId: cert.certificateId,
      recipientDisplay: cert.recipientName,
      institution: 'EMSA-ECUSTA (Catholic University of Health Sciences)',
      courseTitle: cert.courseTitle,
      issueDate: cert.issueDate,
      recordStatus: cert.status === 'ACTIVE' ? 'Active • Non-Revoked' : 'Revoked',
      cryptographicHash: `sha256: ${cert.cryptographicHash}`,
      isAuthentic: cert.status === 'ACTIVE' && isAuthentic,
    };
  }
}
