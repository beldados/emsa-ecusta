import { governanceRepo } from '@/lib/dal';
import { HeroSection, AboutSection } from '@/components/features/governance';

export default async function HomePage() {
  // Query data cleanly through our Data Access Layer (DAL)
  const coreValues = await governanceRepo.getCoreValues();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. About EMSA-ECUSTA Section */}
      <AboutSection coreValues={coreValues} />

      {/* Anchor targets for smooth scrolling */}
      <div id="board" />
      <div id="committees" />
    </div>
  );
}
