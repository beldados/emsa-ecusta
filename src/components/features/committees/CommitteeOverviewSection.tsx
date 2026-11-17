import * as React from 'react';
import { StandingCommittee } from '@/types/committees';
import { Container } from '@/components/ui/container';
import { CommitteeCard } from './CommitteeCard';

interface CommitteeOverviewSectionProps {
  committees: StandingCommittee[];
}

export function CommitteeOverviewSection({ committees }: CommitteeOverviewSectionProps) {
  return (
    <section id="committees" className="py-20 lg:py-28 border-b border-rule-subtle/50 bg-canvas scroll-mt-16">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-content-primary">
            Standing Committees
          </h2>
          <div className="mt-3 h-0.5 w-16 bg-brand-gold rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-content-secondary">
            Six committees. One commitment to medical education, health equity, and service.
          </p>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {committees.map((committee) => (
            <CommitteeCard key={committee.id} committee={committee} />
          ))}
        </div>
      </Container>
    </section>
  );
}
