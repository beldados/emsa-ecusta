import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { committeeRepo, governanceRepo } from '@/lib/dal';
import { CommitteeSlug } from '@/types/committees';
import { CommitteeHeader } from '@/components/features/committees';
import { Container } from '@/components/ui/container';

interface PageProps {
  params: Promise<{ committeeId: string }> | { committeeId: string };
  searchParams: Promise<{ year?: string }> | { year?: string };
}

// Pre-render all 6 standing committees statically
export async function generateStaticParams() {
  const committees = await committeeRepo.getAllCommittees();
  return committees.map((c) => ({
    committeeId: c.id,
  }));
}

// Generate dynamic SEO metadata
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

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* 1. Dynamic Header with Batch Year Switcher */}
      <CommitteeHeader
        committee={committee}
        tenures={tenures}
        activeTenure={activeTenure}
      />

      {/* Stage 4.2 & 4.3 Placeholders */}
      <Container className="py-16">
        <div className="rounded-xl border border-dashed border-rule-subtle p-12 text-center text-content-secondary">
          <p className="font-serif text-lg text-content-primary mb-1">
            {committee.acronym} Leadership & Initiatives Hub
          </p>
          <p className="text-xs">
            Viewing records for academic batch: <span className="text-brand-gold font-semibold">{activeTenure.label}</span>
          </p>
        </div>
      </Container>
    </div>
  );
}
