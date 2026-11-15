import { AcademicTenure, ExecutiveOfficer, CoreValue, HealthcareAffiliate } from '@/types/governance';

export interface IGovernanceRepository {
  getTenures(): Promise<AcademicTenure[]>;
  getActiveTenure(): Promise<AcademicTenure>;
  getTenureById(id: string): Promise<AcademicTenure | null>;
  getExecutiveBoard(batchId?: string): Promise<ExecutiveOfficer[]>;
  getCoreValues(): Promise<CoreValue[]>;
  getAffiliates(): Promise<HealthcareAffiliate[]>;
}
