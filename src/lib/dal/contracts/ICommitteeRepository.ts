import { StandingCommittee, CommitteeLeadershipMember, CommitteeProject, CommitteeSlug } from '@/types/committees';

export interface ICommitteeRepository {
  getAllCommittees(): Promise<StandingCommittee[]>;
  getCommitteeBySlug(slug: CommitteeSlug): Promise<StandingCommittee | null>;
  getLeadership(committeeSlug: CommitteeSlug, batchId?: string): Promise<CommitteeLeadershipMember[]>;
  getProjects(committeeSlug: CommitteeSlug, batchId?: string): Promise<CommitteeProject[]>;
}
