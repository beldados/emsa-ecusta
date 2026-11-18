import * as React from 'react';
import Link from 'next/link';
import { StandingCommittee } from '@/types/committees';
import { AcademicTenure } from '@/types/governance';
import { Container } from '@/components/ui/container';
import { SafeImage } from '@/components/ui/safe-image';
import { BatchYearDropdown } from './BatchYearDropdown';

interface CommitteeHeaderProps {
  committee: StandingCommittee;
  tenures: AcademicTenure[];
  activeTenure: AcademicTenure;
}

export function CommitteeHeader({ committee, tenures, activeTenure }: CommitteeHeaderProps) {
  return (
    <div className="w-full bg-gradient-to-b from-brand-midnight to-canvas pt-8 pb-12">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-content-secondary mb-8">
          <Link href="/" className="hover:text-brand-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#committees" className="hover:text-brand-gold transition-colors">
            Standing Committees
          </Link>
          <span>/</span>
          <span className="text-content-primary font-semibold">{committee.acronym}</span>
        </nav>

        {/* Header Content & Year Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left: Committee Branding & Title */}
          <div className="flex items-start gap-5 max-w-2xl">
            {/* Committee Emblem */}
            <div
              className="h-20 w-20 rounded-2xl border-2 p-2 bg-brand-midnight-deep flex items-center justify-center shrink-0 shadow-xl"
              style={{ borderColor: committee.colorTheme.primary }}
            >
              <SafeImage
                src={committee.logoPath}
                alt={`${committee.acronym} Logo`}
                width={80}
                height={80}
                className="h-full w-full object-contain rounded-xl"
                fallbackText={committee.acronym}
              />
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-content-primary">
                  {committee.acronym}
                </h1>
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                  style={{
                    color: committee.colorTheme.primary,
                    borderColor: `${committee.colorTheme.primary}40`,
                    backgroundColor: `${committee.colorTheme.primary}15`,
                  }}
                >
                  Standing Committee
                </span>
              </div>

              <h2 className="mt-1 text-sm sm:text-base font-semibold text-brand-gold">
                {committee.name}
              </h2>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-content-secondary">
                {committee.shortDescription}
              </p>
            </div>
          </div>

          {/* Right: Interactive Academic Year Dropdown Switcher */}
          <div className="shrink-0">
            <BatchYearDropdown tenures={tenures} activeTenureId={activeTenure.id} />
          </div>
        </div>
      </Container>
    </div>
  );
}
