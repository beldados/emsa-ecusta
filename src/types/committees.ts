import { AcademicBatchTier, SocialLinks } from './governance';

export type CommitteeSlug = 'scome' | 'scoph' | 'scora' | 'scope' | 'scorp' | 'score';

export type ProjectFormatType =
  | 'field_campaign'
  | 'digital_resource'
  | 'workshop'
  | 'academic_symposium'
  | 'hybrid';

export interface ProjectImpactMetric {
  count: number;
  label: string; // e.g. "Screened", "Trained", "Attendees", "Beneficiaries"
}

export interface StandingCommittee {
  id: CommitteeSlug;
  acronym: string; // "SCORA"
  name: string; // "Sexual & Reproductive Health and Rights"
  shortDescription: string;
  fullMission: string;
  colorTheme: {
    primary: string; // Hex color
    badgeBg: string;
    accentGlow: string;
  };
  telegramJoinUrl: string;
}

export interface CommitteeLeadershipMember {
  id: string;
  batchId: string; // Foreign Key -> AcademicTenure.id
  committeeSlug: CommitteeSlug;
  isDirector: boolean; // true = Local Officer (LORA, LOME, etc.), false = Coordinator
  officialTitle: string; // "LOCAL OFFICER ON MEDICAL EDUCATION (LOME)"
  fullName: string;
  batchTier: AcademicBatchTier;
  portraitPath: string;
  socialLinks: SocialLinks;
  rankOrder: number;
}

export interface CommitteeProject {
  id: string;
  batchId: string; // Foreign Key -> AcademicTenure.id
  committeeSlug: CommitteeSlug;
  title: string;
  slug: string;
  campaignType: string; // e.g. "Clinical Skills", "NCD Screening"
  formatType: ProjectFormatType;
  eventDate: string; // e.g. "Jan 2025"
  summary: string;
  longDescription?: string; // Optional rich description for major interventions
  externalUrl?: string; // Optional link for digital tools, Canva/Figma links, or drive folders
  partnerOrganization: string; // e.g. "St. Paul's Hospital MMC", "Ministry of Health"
  impactMetrics: ProjectImpactMetric[];
  coverImagePath: string;
  galleryImages: string[];
}

export interface BatchActivityPhoto {
  id: string;
  imagePath: string;
  caption: string;
}

export interface BatchGallery {
  id: string;
  batchId: string;
  committeeSlug?: CommitteeSlug; // Undefined = General Chapter Batch Album
  title: string;
  photos: BatchActivityPhoto[];
}
