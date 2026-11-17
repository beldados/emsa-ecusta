import { governanceRepo, committeeRepo } from '@/lib/dal';
import {
  HeroSection,
  AboutSection,
  ExecutiveBoardSection,
  AffiliatesBar,
} from '@/components/features/governance';
import { CommitteeOverviewSection } from '@/components/features/committees';

export default async function HomePage() {
  // Concurrent server-side queries via centralized Data Access Layer
  const [coreValues, executiveBoard, activeTenure, committees, affiliates] = await Promise.all([
    governanceRepo.getCoreValues(),
    governanceRepo.getExecutiveBoard(),
    governanceRepo.getActiveTenure(),
    committeeRepo.getAllCommittees(),
    governanceRepo.getAffiliates(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. About EMSA-ECUSTA Section */}
      <AboutSection coreValues={coreValues} />

      {/* 3. Executive Board 2026–2027 Roster */}
      <ExecutiveBoardSection officers={executiveBoard} activeTenure={activeTenure} />

      {/* 4. Standing Committees Showcase */}
      <CommitteeOverviewSection committees={committees} />

      {/* 5. Healthcare Institutions & Affiliations Bar */}
      <AffiliatesBar affiliates={affiliates} />
    </div>
  );
}
