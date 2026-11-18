import * as React from 'react';
import { CommitteeLeadershipMember, StandingCommittee } from '@/types/committees';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { SafeImage } from '@/components/ui/safe-image';

interface CommitteeLeadershipSectionProps {
  leadership: CommitteeLeadershipMember[];
  committee: StandingCommittee;
}

export function CommitteeLeadershipSection({ leadership, committee }: CommitteeLeadershipSectionProps) {
  if (!leadership || leadership.length === 0) {
    return (
      <section className="py-14 bg-canvas">
        <Container>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: committee.colorTheme.primary }} />
            <h3 className="font-serif text-2xl font-bold text-content-primary">
              Committee Leadership
            </h3>
          </div>
          <div className="rounded-xl border border-dashed border-rule-subtle p-8 text-center text-sm text-content-secondary">
            No leadership records published for this batch tenure yet.
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 bg-canvas">
      <Container>
        {/* Section title */}
        <div className="flex items-center gap-3 mb-12">
          <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: committee.colorTheme.primary }} />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-content-primary tracking-tight">
            Committee Leadership
          </h3>
        </div>

        {/* Symmetrical Equal-Card Grid (Auto-fits 2 to 7 members evenly) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {leadership.map((officer) => (
            <Card
              key={officer.id}
              className="group flex flex-col items-center text-center p-6 bg-surface/90 border border-rule-subtle transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl justify-between rounded-2xl"
              style={
                {
                  '--card-accent': committee.colorTheme.primary,
                } as React.CSSProperties
              }
            >
              {/* Top Area: Portrait & Member Details */}
              <div className="flex flex-col items-center w-full">
                {/* Circular Portrait Frame (Identical size and shape for everyone) */}
                <div
                  className="relative mb-5 h-32 w-32 rounded-full border-2 p-1 bg-brand-midnight overflow-hidden shadow-md transition-colors duration-300 flex items-center justify-center"
                  style={{ borderColor: officer.isDirector ? committee.colorTheme.primary : 'var(--color-border-subtle)' }}
                >
                  <SafeImage
                    src={officer.portraitPath}
                    alt={officer.fullName}
                    width={128}
                    height={128}
                    className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fallbackText={officer.fullName}
                  />
                </div>

                {/* Full Name in Benaiah Typography */}
                <h4 className="font-serif text-lg font-bold text-content-primary tracking-tight transition-colors group-hover:text-brand-gold">
                  {officer.fullName}
                </h4>

                {/* Role Badge */}
                <span
                  className="mt-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border"
                  style={{
                    color: committee.colorTheme.primary,
                    borderColor: `${committee.colorTheme.primary}40`,
                    backgroundColor: `${committee.colorTheme.primary}15`,
                  }}
                >
                  {officer.officialTitle}
                </span>

                {/* Batch Tier */}
                <span className="mt-1.5 text-xs text-content-secondary">
                  {officer.batchTier}
                </span>
              </div>

              {/* Bottom Area: Social Channels (Zero harsh white horizontal dividing line) */}
              <div className="mt-6 pt-2 flex items-center justify-center gap-3 w-full text-content-secondary">
                {officer.socialLinks.telegram && (
                  <a
                    href={officer.socialLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-brand-gold transition-colors"
                    aria-label={`Telegram for ${officer.fullName}`}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                  </a>
                )}
                {officer.socialLinks.linkedin && (
                  <a
                    href={officer.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-brand-gold transition-colors"
                    aria-label={`LinkedIn for ${officer.fullName}`}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.86 18.5v-8.37H5.07v8.37h2.79z" />
                    </svg>
                  </a>
                )}
                {officer.socialLinks.email && (
                  <a
                    href={`mailto:${officer.socialLinks.email}`}
                    className="p-1 hover:text-brand-gold transition-colors"
                    aria-label={`Email ${officer.fullName}`}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
