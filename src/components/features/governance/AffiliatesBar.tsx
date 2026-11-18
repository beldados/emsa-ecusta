import * as React from 'react';
import { HealthcareAffiliate } from '@/types/governance';
import { SafeImage } from '@/components/ui/safe-image';

interface AffiliatesBarProps {
  affiliates: HealthcareAffiliate[];
}

export function AffiliatesBar({ affiliates }: AffiliatesBarProps) {
  // Duplicate array 3x for a seamless, stutter-free infinite loop
  const marqueeItems = [...affiliates, ...affiliates, ...affiliates];

  return (
    <section className="py-16 bg-brand-midnight-deep/95 relative overflow-hidden">
      {/* Eyebrow Label */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rule-subtle bg-surface/60">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-content-secondary">
            COLLABORATING HEALTHCARE INSTITUTIONS & AFFILIATIONS
          </span>
        </div>
      </div>

      {/* Marquee Viewport with Soft Gradient Edge Masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex items-center gap-6 sm:gap-8 py-2">
          {marqueeItems.map((affiliate, index) => (
            <a
              key={`${affiliate.id}-${index}`}
              href={affiliate.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`${affiliate.name} (${affiliate.shortName})`}
              className="group shrink-0 h-20 w-44 sm:w-48 rounded-2xl border border-rule-subtle/80 bg-surface/90 hover:border-brand-gold hover:bg-surface hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-gold/5 transition-all duration-300 flex items-center justify-center p-4 relative"
            >
              {/* Internal Logo Frame */}
              <div className="relative h-full w-full flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                <SafeImage
                  src={affiliate.logoPath}
                  alt={affiliate.name}
                  width={140}
                  height={55}
                  className="max-h-12 max-w-[140px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  fallbackText={affiliate.shortName}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
