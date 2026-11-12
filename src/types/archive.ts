import { AcademicTenure, ExecutiveOfficer } from './governance';
import { CommitteeProject, BatchGallery, CommitteeSlug } from './committees';

export interface ArchiveYearRecord {
  tenure: AcademicTenure;
  executiveBoard: ExecutiveOfficer[];
  majorInterventions: CommitteeProject[];
  batchPhotoAlbum: BatchGallery;
  annualReport?: {
    title: string;
    pdfUrl: string;
    fileSize: string;
    publishedDate: string;
  };
}

export interface ArchiveSearchQuery {
  term?: string;
  batchId?: string;
  committeeSlug?: CommitteeSlug | 'all';
}

