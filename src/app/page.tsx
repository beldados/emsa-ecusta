import { governanceRepo } from '@/lib/dal';
import { HeroSection, AboutSection, ExecutiveBoardSection } from '@/components/features/governance';

export default async function HomePage() {
  // Query data cleanly through our Data Access Layer (DAL)
  const [coreValues, executiveBoard, activeTenure] = await Promise.all([
    governanceRepo.getCoreValues(),
    governanceRepo.getExecutiveBoard(),
    governanceRepo.getActiveTenure(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. About EMSA-ECUSTA Section */}
      <AboutSection coreValues={coreValues} />

      {/* 3. Executive Board 2026–2027 Section */}
      <ExecutiveBoardSection officers={executiveBoard} activeTenure={activeTenure} />

      {/* Anchor target for smooth scrolling */}
      <div id="committees" />
    </div>
  );
}
