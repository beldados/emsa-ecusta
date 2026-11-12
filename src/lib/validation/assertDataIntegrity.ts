import governanceData from '@/data/governance.json';
import committeesData from '@/data/committees.json';
import projectsData from '@/data/projects.json';
import archiveData from '@/data/archive.json';
import coursesData from '@/data/courses.json';

import {
  AcademicTenureSchema,
  ExecutiveOfficerSchema,
  CoreValueSchema,
  HealthcareAffiliateSchema,
} from './governanceSchemas';
import {
  StandingCommitteeSchema,
  CommitteeLeadershipMemberSchema,
  CommitteeProjectSchema,
} from './committeeSchemas';
import { ArchiveYearRecordSchema } from './archiveSchemas';
import { AcademyCourseSchema } from './academySchemas';

export function assertDataIntegrity(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // 1. Validate Governance
  governanceData.tenures.forEach((item, index) => {
    const res = AcademicTenureSchema.safeParse(item);
    if (!res.success) errors.push(`governance.json tenures[${index}]: ${res.error.message}`);
  });

  governanceData.executiveOfficers.forEach((item, index) => {
    const res = ExecutiveOfficerSchema.safeParse(item);
    if (!res.success) errors.push(`governance.json executiveOfficers[${index}]: ${res.error.message}`);
  });

  governanceData.coreValues.forEach((item, index) => {
    const res = CoreValueSchema.safeParse(item);
    if (!res.success) errors.push(`governance.json coreValues[${index}]: ${res.error.message}`);
  });

  governanceData.healthcareAffiliates.forEach((item, index) => {
    const res = HealthcareAffiliateSchema.safeParse(item);
    if (!res.success) errors.push(`governance.json healthcareAffiliates[${index}]: ${res.error.message}`);
  });

  // 2. Validate Committees
  committeesData.standingCommittees.forEach((item, index) => {
    const res = StandingCommitteeSchema.safeParse(item);
    if (!res.success) errors.push(`committees.json standingCommittees[${index}]: ${res.error.message}`);
  });

  committeesData.committeeLeadership.forEach((item, index) => {
    const res = CommitteeLeadershipMemberSchema.safeParse(item);
    if (!res.success) errors.push(`committees.json committeeLeadership[${index}]: ${res.error.message}`);
  });

  // 3. Validate Projects
  projectsData.projects.forEach((item, index) => {
    const res = CommitteeProjectSchema.safeParse(item);
    if (!res.success) errors.push(`projects.json projects[${index}]: ${res.error.message}`);
  });

  // 4. Validate Archive
  archiveData.archives.forEach((item, index) => {
    // Note: Archives in archive.json are structured by batch records
    if (!item.batchId || !item.label || !item.status) {
      errors.push(`archive.json archives[${index}]: Missing required batch metadata`);
    }
  });

  // 5. Validate Courses
  coursesData.courses.forEach((item, index) => {
    const res = AcademyCourseSchema.safeParse(item);
    if (!res.success) errors.push(`courses.json courses[${index}]: ${res.error.message}`);
  });

  if (errors.length > 0) {
    throw new Error(`Data integrity assertion failed with ${errors.length} errors:\n${errors.join('\n')}`);
  }

  return {
    isValid: true,
    errors: [],
  };
}

// Automatically assert integrity on import
assertDataIntegrity();

