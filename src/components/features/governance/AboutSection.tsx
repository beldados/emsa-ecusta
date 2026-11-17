import * as React from 'react';
import { Container } from '@/components/ui/container';
import { SafeImage } from '@/components/ui/safe-image';
import { MissionVisionGrid } from './MissionVisionGrid';
import { CoreValuesGrid } from './CoreValuesGrid';
import { CoreValue } from '@/types/governance';

interface AboutSectionProps {
  coreValues: CoreValue[];
}

export function AboutSection({ coreValues }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 lg:py-24 border-b border-rule-subtle/50 bg-canvas">
      <Container>
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-content-primary">
            About EMSA-ECUSTA
          </h2>
          <div className="mt-3 h-0.5 w-16 bg-brand-gold rounded-full" />
        </div>

        {/* Who We Are: Circular Crest + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Circular Crest Emblem */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative h-56 w-56 sm:h-64 sm:w-64 rounded-full border-2 border-rule-gold/50 bg-brand-midnight p-2 shadow-2xl flex items-center justify-center">
              <SafeImage
                src="/assets/branding/emsa-ecusta.jpg"
                alt="EMSA-ECUSTA Official Crest"
                width={250}
                height={250}
                className="rounded-full object-contain"
                fallbackInitials="EMSA"
              />
            </div>
          </div>

          {/* Right: Narrative Editorial */}
          <div className="lg:col-span-8 flex flex-col space-y-4 text-content-secondary leading-relaxed text-sm sm:text-base">
            <h3 className="font-serif text-2xl font-bold text-content-primary tracking-tight">
              Who We Are
            </h3>
            <p>
              The Ethiopian Medical Students' Association (EMSA), founded in 2010, is a non-profit
              organization dedicated to representing medical students across Ethiopia and advancing
              medical education.
            </p>
            <p>
              At Catholic University of Health Sciences, our ECUSTA chapter provides a platform for
              collaboration, supplementary medical training, health advocacy, and community outreach.
            </p>
            <p>
              Through EMSA-Ethiopia and its IFMSA affiliation, we connect local action with a global
              medical student community. Hospital shadowing, public health workshops, screening
              drives, and peer research prepare our members to lead Ethiopia's healthcare transformation.
            </p>
          </div>
        </div>

        {/* Mission & Vision Dual Cards */}
        <MissionVisionGrid />

        {/* Core Values Grid */}
        <CoreValuesGrid values={coreValues} />
      </Container>
    </section>
  );
}
