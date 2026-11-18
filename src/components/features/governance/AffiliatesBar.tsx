import * as React from 'react';
import { HealthcareAffiliate } from '@/types/governance';
import { SafeImage } from '@/components/ui/safe-image';

interface AffiliatesBarProps {
  affiliates: HealthcareAffiliate[];
}

export function AffiliatesBar({ affiliates }: AffiliatesBarProps) {
  // Duplicate the array to create a seamless infinite loop
  const marqueeItems = [...affiliates, ...affiliates, ...affiliates];

  return (
    <section className="py-12 bg-brand-midnight-deep/90 overflow-hidden relative">
      {/* Eyebrow Label */}
      <div className="flex justify-center mb-8">
        <span className="text-[11px] font-bold uppercase tracking-widest text-content-secondary/70">
          COLLABORATING HEALTHCARE INSTITUTIONS & AFFILIATIONS
        </span>
      </div>

      {/* Marquee Viewport with Edge Fade Masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex items-center gap-12 sm:gap-16">
          {marqueeItems.map((affiliate, index) => (
            <a
              key={`${affiliate.id}-${index}`}
              href={affiliate.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={affiliate.name}
              className="group shrink-0 flex items-center justify-center p-3 rounded-xl border border-transparent hover:border-rule-subtle hover:bg-surface/60 transition-all duration-300"
            >
              {/* Logo Frame — Sole visual element */}
              <div className="h-14 sm:h-16 w-32 sm:w-36 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                <SafeImage
                  src={affiliate.logoPath}
                  alt={affiliate.name}
                  width={140}
                  height={60}
                  className="max-h-full max-w-full object-contain"
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
