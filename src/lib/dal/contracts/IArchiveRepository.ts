import { ArchiveYearRecord, ArchiveSearchQuery } from '@/types/archive';
import { CommitteeProject } from '@/types/committees';

export interface IArchiveRepository {
  getAllArchives(): Promise<ArchiveYearRecord[]>;
  getArchiveByBatch(batchId: string): Promise<ArchiveYearRecord | null>;
  searchProjects(query: ArchiveSearchQuery): Promise<CommitteeProject[]>;
}
