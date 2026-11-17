import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { committeeRepo, governanceRepo } from '@/lib/dal';
import { CommitteeSlug } from '@/types/committees';
import {
  CommitteeHeader,
  CommitteeLeadershipSection,
} from '@/components/features/committees';
import { Container } from '@/components/ui/container';

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

  // Retrieve leadership for the selected batch
  const leadership = await committeeRepo.getLeadership(slug, activeTenure.id);

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* 1. Dynamic Header with Batch Year Switcher */}
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

      {/* Stage 4.3 Placeholder */}
      <Container className="py-12">
        <div className="rounded-xl border border-dashed border-rule-subtle p-8 text-center text-xs text-content-secondary">
          Projects & Batch Activity Gallery will load in Stage 4.3.
        </div>
      </Container>
    </div>
  );
}
