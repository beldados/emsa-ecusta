import { JsonGovernanceRepository } from './repositories/JsonGovernanceRepository';
import { JsonCommitteeRepository } from './repositories/JsonCommitteeRepository';
import { JsonArchiveRepository } from './repositories/JsonArchiveRepository';
import { JsonAcademyRepository } from './repositories/JsonAcademyRepository';

// Export contracts
export * from './contracts/IGovernanceRepository';
export * from './contracts/ICommitteeRepository';
export * from './contracts/IArchiveRepository';
export * from './contracts/IAcademyRepository';

// Export concrete repository implementations
export * from './repositories/JsonGovernanceRepository';
export * from './repositories/JsonCommitteeRepository';
export * from './repositories/JsonArchiveRepository';
export * from './repositories/JsonAcademyRepository';

// Export singleton DAL repository instances
export const governanceRepo = new JsonGovernanceRepository();
export const committeeRepo = new JsonCommitteeRepository();
export const archiveRepo = new JsonArchiveRepository();
export const academyRepo = new JsonAcademyRepository();
