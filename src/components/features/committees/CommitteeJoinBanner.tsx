import * as React from 'react';
import { StandingCommittee } from '@/types/committees';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

interface CommitteeJoinBannerProps {
  committee: StandingCommittee;
}

export function CommitteeJoinBanner({ committee }: CommitteeJoinBannerProps) {
  return (
    <section className="py-14 bg-brand-midnight">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-rule-subtle bg-surface/90 shadow-xl">
          {/* Text block */}
          <div className="flex flex-col text-center sm:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-content-primary tracking-tight">
              Join this Standing Committee
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-content-secondary">
              Open to all registered ECUSTA medical students.
            </p>
          </div>

          {/* Action trigger */}
          <Button
            size="lg"
            className="shrink-0 font-semibold shadow-lg text-white"
            style={{ backgroundColor: committee.colorTheme.primary }}
            asChild
          >
            <a
              href={committee.telegramJoinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>Join {committee.acronym} Telegram Group</span>
              <span>↗</span>
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
