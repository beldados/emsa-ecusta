import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { committeeRepo, governanceRepo } from '@/lib/dal';
import { CommitteeSlug } from '@/types/committees';
import {
  CommitteeHeader,
  CommitteeLeadershipSection,
  CommitteeProjectsSection,
  CommitteeBatchGallery,
  CommitteeJoinBanner,
} from '@/components/features/committees';

interface PageProps {
  params: Promise<{ committeeId: string }> | { committeeId: string };
  searchParams?: Promise<{ year?: string }> | { year?: string };
}

export async function generateStaticParams() {
  const committees = await committeeRepo.getAllCommittees();
  return committees.map((c) => ({
    committeeId: c.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ committeeId: string }> | { committeeId: string } }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const committee = await committeeRepo.getCommitteeBySlug(resolvedParams.committeeId.toLowerCase() as CommitteeSlug);

  if (!committee) return { title: 'Committee Not Found | EMSA-ECUSTA' };

  return {
    title: `${committee.acronym} - ${committee.name} | EMSA-ECUSTA`,
    description: committee.shortDescription,
  };
}

export default async function CommitteeHubPage({ params, searchParams }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams || {});

  const slug = resolvedParams.committeeId.toLowerCase() as CommitteeSlug;
  const committee = await committeeRepo.getCommitteeBySlug(slug);

  if (!committee) {
    notFound();
  }

  // Retrieve batch tenures
  const tenures = await governanceRepo.getTenures();
  const currentTenure = await governanceRepo.getActiveTenure();
  const selectedBatchId = resolvedSearchParams.year || currentTenure.id;
  const activeTenure = tenures.find((t) => t.id === selectedBatchId) || currentTenure;

  // Retrieve leadership and projects for the selected batch concurrently
  const [leadership, projects] = await Promise.all([
    committeeRepo.getLeadership(slug, activeTenure.id),
    committeeRepo.getProjects(slug, activeTenure.id),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* 1. Dynamic Header with Batch Year Dropdown */}
      <CommitteeHeader
        committee={committee}
        tenures={tenures}
        activeTenure={activeTenure}
      />

      {/* 2. Committee Leadership Roster (Director + Coordinators) */}
      <CommitteeLeadershipSection
        leadership={leadership}
        committee={committee}
      />

      {/* 3. Projects & Campaigns Showcase */}
      <CommitteeProjectsSection
        projects={projects}
        committee={committee}
      />

      {/* 4. Batch Activity Photo Gallery (6-Photo Grid) */}
      <CommitteeBatchGallery
        committee={committee}
        activeTenureLabel={activeTenure.label}
      />

      {/* 5. "Join this Committee" Community Banner */}
      <CommitteeJoinBanner committee={committee} />
    </div>
  );
}
