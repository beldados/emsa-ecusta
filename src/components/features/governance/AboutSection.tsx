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
    <section id="about" className="py-24 lg:py-36 bg-canvas">
      <Container className="space-y-20">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
            ABOUT OUR CHAPTER
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-content-primary">
            About EMSA-ECUSTA
          </h2>
          <div className="mt-4 h-0.5 w-16 bg-brand-gold rounded-full" />
        </div>

        {/* Who We Are: Spacious Emblem + Editorial Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Prominent Crest */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-full border border-rule-gold/40 bg-brand-midnight/90 p-3 shadow-2xl flex items-center justify-center">
              <SafeImage
                src="/assets/branding/emsa-ecusta.jpg"
                alt="EMSA-ECUSTA Official Crest"
                width={300}
                height={300}
                className="rounded-full object-contain"
                fallbackText="EMSA ECUSTA"
              />
            </div>
          </div>

          {/* Right: Generous Narrative */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-content-secondary leading-relaxed text-base sm:text-lg">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-content-primary tracking-tight">
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
        <div className="pt-4">
          <MissionVisionGrid />
        </div>

        {/* Core Values Grid */}
        <div className="pt-4">
          <CoreValuesGrid values={coreValues} />
        </div>
      </Container>
    </section>
  );
}
