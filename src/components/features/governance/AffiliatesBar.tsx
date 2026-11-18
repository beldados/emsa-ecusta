import * as React from 'react';
import { HealthcareAffiliate } from '@/types/governance';
import { SafeImage } from '@/components/ui/safe-image';

interface AffiliatesBarProps {
  affiliates: HealthcareAffiliate[];
}

export function AffiliatesBar({ affiliates }: AffiliatesBarProps) {
  // Duplicate array for a seamless infinite loop
  const marqueeItems = [...affiliates, ...affiliates, ...affiliates];

  return (
    <section className="py-20 bg-brand-midnight-deep/95 relative overflow-hidden">
      {/* Eyebrow Label */}
      <div className="flex justify-center mb-12">
        <span className="text-[11px] font-bold uppercase tracking-widest text-content-secondary/80">
          COLLABORATING HEALTHCARE INSTITUTIONS & AFFILIATIONS
        </span>
      </div>

      {/* Marquee Viewport with Edge Fade Masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex items-center gap-16 sm:gap-24 py-4">
          {marqueeItems.map((affiliate, index) => (
            <a
              key={`${affiliate.id}-${index}`}
              href={affiliate.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`${affiliate.name} (${affiliate.shortName})`}
              className="group shrink-0 flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110"
            >
              {/* Large Free-Floating Logo (Zero Rectangular Box) */}
              <div className="relative flex items-center justify-center">
                <SafeImage
                  src={affiliate.logoPath}
                  alt={affiliate.name}
                  width={200}
                  height={100}
                  className="h-20 sm:h-24 w-auto max-w-[200px] object-contain drop-shadow-xl transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(92,179,255,0.3)]"
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
