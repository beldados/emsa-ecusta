import * as React from 'react';
import { ExecutiveOfficer } from '@/types/governance';
import { Card, CardContent } from '@/components/ui/card';
import { SafeImage } from '@/components/ui/safe-image';

interface ExecutiveCardProps {
  officer: ExecutiveOfficer;
}

export function ExecutiveCard({ officer }: ExecutiveCardProps) {
  return (
    <Card className="group relative flex flex-col items-center text-center p-6 bg-surface/90 border-rule-subtle hover:border-rule-gold transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/5">
      {/* Portrait frame */}
      <div className="relative mb-5 h-28 w-28 sm:h-32 sm:w-32 rounded-full border-2 border-rule-subtle group-hover:border-brand-gold/80 transition-colors duration-300 overflow-hidden bg-brand-midnight flex items-center justify-center p-1 shadow-md">
        <SafeImage
          src={officer.portraitPath}
          alt={officer.fullName}
          width={128}
          height={128}
          className="h-full w-full rounded-full object-cover"
          fallbackText={officer.fullName}
        />
      </div>

      {/* Member Details */}
      <CardContent className="p-0 flex flex-col items-center w-full">
        <h4 className="font-serif text-lg font-bold text-content-primary tracking-tight group-hover:text-brand-gold transition-colors">
          {officer.fullName}
        </h4>

        <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-brand-gold">
          {officer.role}
        </span>

        <span className="mt-1 text-xs text-content-secondary">
          {officer.batchTier}
        </span>

        {/* Social / Direct Contact Channels */}
        <div className="mt-5 flex items-center justify-center gap-3 border-t border-rule-subtle/50 pt-3 w-full text-content-secondary">
          {officer.socialLinks.telegram && (
            <a
              href={officer.socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Telegram for ${officer.fullName}`}
              className="p-1 hover:text-brand-gold transition-colors"
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
              aria-label={`LinkedIn for ${officer.fullName}`}
              className="p-1 hover:text-brand-gold transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.86 18.5v-8.37H5.07v8.37h2.79z" />
              </svg>
            </a>
          )}

          {officer.socialLinks.email && (
            <a
              href={`mailto:${officer.socialLinks.email}`}
              aria-label={`Email ${officer.fullName}`}
              className="p-1 hover:text-brand-gold transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
