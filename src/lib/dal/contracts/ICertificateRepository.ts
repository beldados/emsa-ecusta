import { CertificateRecord, PublicVerificationResult } from '@/types/credentials';

export interface ICertificateRepository {
  getAllCertificates(): Promise<CertificateRecord[]>;
  getCertificateById(certificateId: string): Promise<CertificateRecord | null>;
  verifyCertificate(certificateId: string): Promise<PublicVerificationResult | null>;
}
