export type AcademicBatchTier =
  | 'Pre-Clinical Year I'
  | 'Pre-Clinical Year II'
  | 'Clinical Year I'
  | 'Clinical Year II'
  | 'Internship'
  | 'Alumni';

export type TenureStatus = 'active' | 'archived' | 'frozen';

export interface SocialLinks {
  telegram?: string;
  linkedin?: string;
  email: string;
}

export interface AcademicTenure {
  id: string; // e.g. "batch_2026_2027"
  label: string; // e.g. "2026–2027"
  status: TenureStatus;
  isCurrent: boolean;
  themeStatement?: string;
  annualReportUrl?: string;
}

export interface ExecutiveOfficer {
  id: string;
  batchId: string; // Foreign Key -> AcademicTenure.id
  fullName: string;
  role: string; // "PRESIDENT", "VP OF EXTERNAL AFFAIRS", etc.
  batchTier: AcademicBatchTier;
  portraitPath: string; // e.g. "/assets/leadership/2026-2027/president.webp"
  socialLinks: SocialLinks;
  rankOrder: number;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
}

export interface HealthcareAffiliate {
  id: string;
  name: string;
  shortName: string;
  category: 'university' | 'national_association' | 'international' | 'ministry' | 'hospital' | 'humanitarian';
  logoPath: string;
  websiteUrl: string;
}
