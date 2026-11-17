import * as React from 'react';
import { ExecutiveOfficer, AcademicTenure } from '@/types/governance';
import { Container } from '@/components/ui/container';
import { ExecutiveCard } from './ExecutiveCard';

interface ExecutiveBoardSectionProps {
  officers: ExecutiveOfficer[];
  activeTenure: AcademicTenure;
}

export function ExecutiveBoardSection({ officers, activeTenure }: ExecutiveBoardSectionProps) {
  return (
    <section id="board" className="py-20 lg:py-28 border-b border-rule-subtle/50 bg-brand-midnight-deep/60 scroll-mt-16">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
            CHAPTER GOVERNANCE & LEADERSHIP
          </span>

          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-content-primary">
            Executive Board {activeTenure.label}
          </h2>

          {/* Active Tenure Pill */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule-subtle bg-surface text-xs font-semibold text-content-secondary">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>[ {activeTenure.label} Active Tenure ]</span>
          </div>

          <p className="mt-5 text-sm sm:text-base leading-relaxed text-content-secondary">
            The elected executive student council steering EMSA-ECUSTA medical initiatives, external
            liaisons, and member empowerment.
          </p>
        </div>

        {/* 8-Card Kinetic Grid with Focus Group Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 group/grid">
          {officers.map((officer) => (
            <div
              key={officer.id}
              className="transition-opacity duration-300 group-hover/grid:opacity-60 hover:!opacity-100"
            >
              <ExecutiveCard officer={officer} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
