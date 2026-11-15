import archiveData from '@/data/archive.json';
import governanceData from '@/data/governance.json';
import projectsData from '@/data/projects.json';
import { IArchiveRepository } from '../contracts/IArchiveRepository';
import { ArchiveYearRecord, ArchiveSearchQuery } from '@/types/archive';
import { CommitteeProject } from '@/types/committees';
import { AcademicTenure, ExecutiveOfficer } from '@/types/governance';

export class JsonArchiveRepository implements IArchiveRepository {
  async getAllArchives(): Promise<ArchiveYearRecord[]> {
    const allProjects = projectsData.projects as CommitteeProject[];
    const allOfficers = governanceData.executiveOfficers as ExecutiveOfficer[];
    const allTenures = governanceData.tenures as AcademicTenure[];

    return archiveData.archives.map((arch) => {
      const tenure = allTenures.find((t) => t.id === arch.batchId) || {
        id: arch.batchId,
        label: arch.label,
        status: arch.status as any,
        isCurrent: arch.status === 'active',
      };

      const executiveBoard = allOfficers
        .filter((o) => o.batchId === arch.batchId)
        .sort((a, b) => a.rankOrder - b.rankOrder);

      const majorInterventions = allProjects.filter((p) => p.batchId === arch.batchId);

      const annualReport = arch.annualReport
        ? {
            title: arch.annualReport.title,
            pdfUrl: arch.annualReport.pdfUrl,
            fileSize: (arch.annualReport as any).fileSize || '2.4 MB',
            publishedDate: arch.annualReport.publishedDate,
          }
        : undefined;

      return {
        tenure,
        executiveBoard,
        majorInterventions,
        batchPhotoAlbum: arch.photoAlbum as any,
        annualReport,
      };
    });
  }

  async getArchiveByBatch(batchId: string): Promise<ArchiveYearRecord | null> {
    const archives = await this.getAllArchives();
    return archives.find((a) => a.tenure.id === batchId) || null;
  }

  async searchProjects(query: ArchiveSearchQuery): Promise<CommitteeProject[]> {
    let results = projectsData.projects as CommitteeProject[];

    if (query.batchId) {
      results = results.filter((p) => p.batchId === query.batchId);
    }

    if (query.committeeSlug && query.committeeSlug !== 'all') {
      results = results.filter((p) => p.committeeSlug === query.committeeSlug);
    }

    if (query.term && query.term.trim()) {
      const searchTerm = query.term.toLowerCase().trim();
      results = results.filter((p) => {
        return (
          p.title.toLowerCase().includes(searchTerm) ||
          p.summary.toLowerCase().includes(searchTerm) ||
          (p.longDescription && p.longDescription.toLowerCase().includes(searchTerm)) ||
          p.campaignType.toLowerCase().includes(searchTerm) ||
          p.partnerOrganization.toLowerCase().includes(searchTerm)
        );
      });
    }

    return results;
  }
}
