import { JsonGovernanceRepository } from './repositories/JsonGovernanceRepository';
import { JsonCommitteeRepository } from './repositories/JsonCommitteeRepository';
import { JsonArchiveRepository } from './repositories/JsonArchiveRepository';
import { JsonAcademyRepository } from './repositories/JsonAcademyRepository';
import { JsonCertificateRepository } from './repositories/JsonCertificateRepository';

// Export contracts
export * from './contracts/IGovernanceRepository';
export * from './contracts/ICommitteeRepository';
export * from './contracts/IArchiveRepository';
export * from './contracts/IAcademyRepository';
export * from './contracts/ICertificateRepository';

// Export concrete repository implementations
export * from './repositories/JsonGovernanceRepository';
export * from './repositories/JsonCommitteeRepository';
export * from './repositories/JsonArchiveRepository';
export * from './repositories/JsonAcademyRepository';
export * from './repositories/JsonCertificateRepository';

// Export singleton DAL repository instances
export const governanceRepo = new JsonGovernanceRepository();
export const committeeRepo = new JsonCommitteeRepository();
export const archiveRepo = new JsonArchiveRepository();
export const academyRepo = new JsonAcademyRepository();
export const certificateRepo = new JsonCertificateRepository();
