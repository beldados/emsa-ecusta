import * as React from 'react';
import { StandingCommittee } from '@/types/committees';
import { Container } from '@/components/ui/container';
import { SafeImage } from '@/components/ui/safe-image';

interface CommitteeAboutSectionProps {
  committee: StandingCommittee;
}

export function CommitteeAboutSection({ committee }: CommitteeAboutSectionProps) {
  return (
    <section className="py-20 bg-canvas">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Official Committee Emblem Frame */}
          <div className="lg:col-span-4 flex justify-center">
            <div
              className="relative h-56 w-56 sm:h-64 sm:w-64 rounded-3xl border-2 p-3 bg-brand-midnight-deep shadow-2xl flex items-center justify-center overflow-hidden"
              style={{ borderColor: committee.colorTheme.primary }}
            >
              <SafeImage
                src={committee.logoPath}
                alt={`${committee.acronym} Official Emblem`}
                width={220}
                height={220}
                className="h-full w-full object-contain rounded-2xl"
                fallbackText={committee.acronym}
              />
            </div>
          </div>

          {/* Right: Editorial Description & Mandate */}
          <div className="lg:col-span-8 flex flex-col space-y-5 text-content-secondary leading-relaxed text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-6 rounded-full" style={{ backgroundColor: committee.colorTheme.primary }} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
                About the Standing Committee
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-content-primary tracking-tight">
              {committee.name} ({committee.acronym})
            </h3>

            <p className="text-content-primary font-medium text-base sm:text-lg">
              {committee.fullMission}
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>

            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
