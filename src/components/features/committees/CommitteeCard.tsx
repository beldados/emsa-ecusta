import * as React from 'react';
import Link from 'next/link';
import { StandingCommittee } from '@/types/committees';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { SafeImage } from '@/components/ui/safe-image';

interface CommitteeCardProps {
  committee: StandingCommittee;
}

export function CommitteeCard({ committee }: CommitteeCardProps) {
  return (
    <Card className="group relative flex flex-col justify-between bg-surface/90 border-rule-subtle hover:border-rule-gold transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/5 p-6">
      <div>
        {/* Top bar: Emblem + Colored Acronym Badge */}
        <div className="flex items-center justify-between pb-4">
          <div className="h-12 w-12 rounded-full border border-rule-subtle bg-brand-midnight p-1 flex items-center justify-center overflow-hidden">
            <SafeImage
              src={committee.logoPath}
              alt={`${committee.acronym} Logo`}
              width={48}
              height={48}
              className="h-full w-full object-contain rounded-full"
              fallbackText={committee.acronym}
            />
          </div>

          <span
            className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
            style={{
              color: committee.colorTheme.primary,
              borderColor: `${committee.colorTheme.primary}40`,
              backgroundColor: `${committee.colorTheme.primary}15`,
            }}
          >
            {committee.acronym}
          </span>
        </div>

        {/* Committee Title & Scope */}
        <CardHeader className="p-0 pt-2">
          <CardTitle className="font-serif text-xl font-bold text-content-primary group-hover:text-brand-gold transition-colors">
            {committee.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 pt-3 text-sm leading-relaxed text-content-secondary">
          {committee.shortDescription}
        </CardContent>
      </div>

      {/* Action trigger */}
      <CardFooter className="p-0 pt-6 border-t border-rule-subtle/50 mt-6">
        <Link
          href={`/committees/${committee.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-content-primary group-hover:text-brand-gold transition-colors"
        >
          <span>View Committee Hub & Archive</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
