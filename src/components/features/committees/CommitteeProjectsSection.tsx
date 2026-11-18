import * as React from 'react';
import { CommitteeProject, StandingCommittee } from '@/types/committees';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { SafeImage } from '@/components/ui/safe-image';

interface CommitteeProjectsSectionProps {
  projects: CommitteeProject[];
  committee: StandingCommittee;
}

export function CommitteeProjectsSection({ projects, committee }: CommitteeProjectsSectionProps) {
  return (
    <section className="py-16 bg-brand-midnight-deep/40">
      <Container>
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: committee.colorTheme.primary }} />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-content-primary tracking-tight">
            Projects & Campaigns
          </h3>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-rule-subtle p-12 text-center text-sm text-content-secondary">
            No projects published for this batch tenure yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group flex flex-col justify-between overflow-hidden bg-surface/90 border-rule-subtle hover:border-brand-gold transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/5"
              >
                <div>
                  {/* Project Cover Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-brand-midnight">
                    <SafeImage
                      src={project.coverImagePath}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fallbackText={project.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight-deep via-transparent to-transparent opacity-80" />

                    {/* Overlay Badges */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-semibold">
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-midnight/90 border border-rule-subtle text-content-primary">
                        {project.eventDate}
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-full border"
                        style={{
                          color: committee.colorTheme.primary,
                          borderColor: `${committee.colorTheme.primary}50`,
                          backgroundColor: `${committee.colorTheme.primary}20`,
                        }}
                      >
                        {project.campaignType}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    <CardHeader className="p-0">
                      <CardTitle className="font-serif text-xl font-bold text-content-primary group-hover:text-brand-gold transition-colors">
                        {project.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 pt-3 text-sm leading-relaxed text-content-secondary line-clamp-3">
                      {project.summary}
                    </CardContent>

                    {/* Metadata Row: Partner & Impact Metric */}
                    <div className="mt-5 pt-4 border-t border-rule-subtle/50 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-content-secondary font-medium">
                        {project.partnerOrganization}
                      </span>

                      {project.impactMetrics && project.impactMetrics.length > 0 && (
                        <div className="flex items-center gap-1.5 font-bold text-brand-gold">
                          <span>•</span>
                          <span>
                            {project.impactMetrics[0].count.toLocaleString()}{' '}
                            {project.impactMetrics[0].label}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <CardFooter className="p-6 pt-0">
                  {project.externalUrl ? (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-gold hover:underline"
                    >
                      <span>Explore Digital Resource</span>
                      <span>↗</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-content-primary group-hover:text-brand-gold transition-colors">
                      <span>View Project Details</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
