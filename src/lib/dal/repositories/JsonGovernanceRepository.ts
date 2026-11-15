import governanceData from '@/data/governance.json';
import { IGovernanceRepository } from '../contracts/IGovernanceRepository';
import { AcademicTenure, ExecutiveOfficer, CoreValue, HealthcareAffiliate } from '@/types/governance';

export class JsonGovernanceRepository implements IGovernanceRepository {
  async getTenures(): Promise<AcademicTenure[]> {
    return governanceData.tenures as AcademicTenure[];
  }

  async getActiveTenure(): Promise<AcademicTenure> {
    const active = governanceData.tenures.find((t) => t.isCurrent);
    if (!active) {
      throw new Error('Active tenure not configured in governance.json');
    }
    return active as AcademicTenure;
  }

  async getTenureById(id: string): Promise<AcademicTenure | null> {
    const tenure = governanceData.tenures.find((t) => t.id === id);
    return (tenure as AcademicTenure) || null;
  }

  async getExecutiveBoard(batchId?: string): Promise<ExecutiveOfficer[]> {
    const targetBatchId = batchId || (await this.getActiveTenure()).id;
    return (governanceData.executiveOfficers as ExecutiveOfficer[])
      .filter((officer) => officer.batchId === targetBatchId)
      .sort((a, b) => a.rankOrder - b.rankOrder);
  }

  async getCoreValues(): Promise<CoreValue[]> {
    return governanceData.coreValues as CoreValue[];
  }

  async getAffiliates(): Promise<HealthcareAffiliate[]> {
    return governanceData.healthcareAffiliates as HealthcareAffiliate[];
  }
}
