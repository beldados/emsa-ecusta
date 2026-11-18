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
      <section className="py-12 bg-canvas">
        <Container>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-0.5 w-6 rounded-full" style={{ backgroundColor: committee.colorTheme.primary }} />
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

  // Separate Director from Coordinators
  const director = leadership.find((l) => l.isDirector) || leadership[0];
  const coordinators = leadership.filter((l) => l.id !== director.id);

  return (
    <section className="py-16 bg-canvas">
      <Container>
        {/* Section title */}
        <div className="flex items-center gap-3 mb-10">
          <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: committee.colorTheme.primary }} />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-content-primary tracking-tight">
            Committee Leadership
          </h3>
        </div>

        {/* Leadership Grid: Director Featured + Coordinators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* ========================================================
              FEATURED DIRECTOR / LOCAL OFFICER (4 cols)
              ======================================================== */}
          <div className="lg:col-span-4 flex flex-col">
            <Card className="flex-1 flex flex-col items-center text-center p-8 bg-surface/90 border-rule-subtle hover:border-brand-gold transition-all duration-300 shadow-md">
              {/* Director Portrait */}
              <div
                className="relative mb-6 h-36 w-36 sm:h-40 sm:w-40 rounded-2xl border-2 p-1 bg-brand-midnight flex items-center justify-center overflow-hidden shadow-lg"
                style={{ borderColor: committee.colorTheme.primary }}
              >
                <SafeImage
                  src={director.portraitPath}
                  alt={director.fullName}
                  width={160}
                  height={160}
                  className="h-full w-full rounded-xl object-cover"
                  fallbackText={director.fullName}
                />
              </div>

              {/* Director Details */}
              <CardContent className="p-0 flex flex-col items-center w-full">
                <h4 className="font-serif text-xl font-bold text-content-primary tracking-tight">
                  {director.fullName}
                </h4>

                <span
                  className="mt-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                  style={{
                    color: committee.colorTheme.primary,
                    borderColor: `${committee.colorTheme.primary}40`,
                    backgroundColor: `${committee.colorTheme.primary}10`,
                  }}
                >
                  {director.officialTitle}
                </span>

                <span className="mt-2 text-xs text-content-secondary">
                  {director.batchTier}
                </span>

                {/* Direct Contact Channels */}
                <div className="mt-6 flex items-center justify-center gap-3 border-t border-rule-subtle/50 pt-4 w-full text-content-secondary">
                  {director.socialLinks.telegram && (
                    <a
                      href={director.socialLinks.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:text-brand-gold transition-colors"
                      aria-label="Telegram"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                      </svg>
                    </a>
                  )}
                  {director.socialLinks.linkedin && (
                    <a
                      href={director.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:text-brand-gold transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.86 18.5v-8.37H5.07v8.37h2.79z" />
                      </svg>
                    </a>
                  )}
                  {director.socialLinks.email && (
                    <a
                      href={`mailto:${director.socialLinks.email}`}
                      className="p-1 hover:text-brand-gold transition-colors"
                      aria-label="Email"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ========================================================
              COORDINATORS ROSTER (8 cols, responsive grid)
              ======================================================== */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full">
              {coordinators.map((officer) => (
                <Card
                  key={officer.id}
                  className="flex flex-col items-center text-center p-5 bg-surface/80 border-rule-subtle hover:border-brand-gold transition-all duration-300 justify-between"
                >
                  <div className="flex flex-col items-center">
                    {/* Coordinator Portrait */}
                    <div className="relative mb-3 h-24 w-24 rounded-full border border-rule-subtle overflow-hidden bg-brand-midnight p-1">
                      <SafeImage
                        src={officer.portraitPath}
                        alt={officer.fullName}
                        width={96}
                        height={96}
                        className="h-full w-full rounded-full object-cover"
                        fallbackText={officer.fullName}
                      />
                    </div>

                    <h5 className="font-serif text-base font-bold text-content-primary tracking-tight">
                      {officer.fullName}
                    </h5>

                    <span className="mt-1 text-[11px] font-semibold text-brand-gold uppercase tracking-wider line-clamp-1">
                      {officer.officialTitle}
                    </span>

                    <span className="mt-0.5 text-xs text-content-secondary">
                      {officer.batchTier}
                    </span>
                  </div>

                  {/* Email contact */}
                  {officer.socialLinks.email && (
                    <div className="mt-4 pt-3 border-t border-rule-subtle/50 w-full flex justify-center">
                      <a
                        href={`mailto:${officer.socialLinks.email}`}
                        className="text-xs text-content-secondary hover:text-brand-gold transition-colors inline-flex items-center gap-1"
                        aria-label="Email"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Contact</span>
                      </a>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
