import * as React from 'react';
import { HealthcareAffiliate } from '@/types/governance';
import { Container } from '@/components/ui/container';
import { SafeImage } from '@/components/ui/safe-image';

interface AffiliatesBarProps {
  affiliates: HealthcareAffiliate[];
}

export function AffiliatesBar({ affiliates }: AffiliatesBarProps) {
  return (
    <section className="py-14 bg-brand-midnight/60 border-b border-rule-subtle/50">
      <Container>
        <div className="flex flex-col items-center text-center mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-content-secondary/80">
            COLLABORATING HEALTHCARE INSTITUTIONS & AFFILIATIONS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {affiliates.map((affiliate) => (
            <a
              key={affiliate.id}
              href={affiliate.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-3 rounded-lg border border-transparent hover:border-rule-subtle hover:bg-surface/50 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-full border border-rule-subtle/60 bg-brand-midnight-deep p-1.5 flex items-center justify-center mb-2.5 group-hover:border-brand-gold/60 transition-colors">
                <SafeImage
                  src={affiliate.logoPath}
                  alt={affiliate.name}
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                  fallbackText={affiliate.shortName}
                />
              </div>

              <span className="text-xs font-bold text-content-primary group-hover:text-brand-gold transition-colors line-clamp-1">
                {affiliate.shortName}
              </span>

              <span className="text-[10px] text-content-secondary line-clamp-1 mt-0.5">
                {affiliate.name}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
