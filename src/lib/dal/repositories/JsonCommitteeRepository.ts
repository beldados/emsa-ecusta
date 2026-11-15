import committeesData from '@/data/committees.json';
import projectsData from '@/data/projects.json';
import governanceData from '@/data/governance.json';
import { ICommitteeRepository } from '../contracts/ICommitteeRepository';
import { StandingCommittee, CommitteeLeadershipMember, CommitteeProject, CommitteeSlug } from '@/types/committees';

export class JsonCommitteeRepository implements ICommitteeRepository {
  private getActiveBatchId(): string {
    const active = governanceData.tenures.find((t) => t.isCurrent);
    return active ? active.id : 'batch_2026_2027';
  }

  async getAllCommittees(): Promise<StandingCommittee[]> {
    return committeesData.standingCommittees as StandingCommittee[];
  }

  async getCommitteeBySlug(slug: CommitteeSlug): Promise<StandingCommittee | null> {
    const committee = committeesData.standingCommittees.find((c) => c.id === slug);
    return (committee as StandingCommittee) || null;
  }

  async getLeadership(committeeSlug: CommitteeSlug, batchId?: string): Promise<CommitteeLeadershipMember[]> {
    const targetBatch = batchId || this.getActiveBatchId();
    return (committeesData.committeeLeadership as CommitteeLeadershipMember[])
      .filter((l) => l.committeeSlug === committeeSlug && l.batchId === targetBatch)
      .sort((a, b) => a.rankOrder - b.rankOrder);
  }

  async getProjects(committeeSlug: CommitteeSlug, batchId?: string): Promise<CommitteeProject[]> {
    const allProjects = projectsData.projects as CommitteeProject[];
    if (batchId) {
      return allProjects.filter((p) => p.committeeSlug === committeeSlug && p.batchId === batchId);
    }
    return allProjects.filter((p) => p.committeeSlug === committeeSlug);
  }
}
