import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const pillars = ['ADVOCACY', 'INTEGRITY', 'EXCELLENCE', 'SERVICE'];

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 border-b border-rule-subtle/50">
      {/* Subtle radial glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-[11px] font-semibold tracking-widest uppercase mb-6">
          Official EMSA-ECUSTA Student Body
        </div>

        {/* Main headline */}
        <h1 className="max-w-4xl font-serif text-4xl sm:text-6xl font-bold tracking-tight text-content-primary leading-[1.15]">
          Cultivating Clinical Excellence. <br />
          <span className="text-brand-gold">Shape Our Medical Future.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-content-secondary">
          EMSA-ECUSTA represents the medical student body at Catholic University of Health
          Sciences—driving academic excellence, community health advocacy, and peer leadership.
        </p>

        {/* Action triggers */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" size="lg" asChild>
            <a href="#committees">EXPLORE COMMITTEES</a>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <a href="#board">MEET THE BOARD</a>
          </Button>
        </div>

        {/* Core pillars row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold tracking-widest text-content-secondary/80">
          {pillars.map((pillar) => (
            <div key={pillar} className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <span className="text-brand-gold text-sm">★</span>
              <span>{pillar}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
