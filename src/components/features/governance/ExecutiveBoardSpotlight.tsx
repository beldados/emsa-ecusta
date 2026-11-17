'use client';

import * as React from 'react';
import { ExecutiveOfficer } from '@/types/governance';
import { SafeImage } from '@/components/ui/safe-image';
import { cn } from '@/lib/utils/cn';

interface ExecutiveBoardSpotlightProps {
  officers: ExecutiveOfficer[];
}

interface MemberWithEditorial extends ExecutiveOfficer {
  tier: string;
  bio: string;
}

export function ExecutiveBoardSpotlight({ officers }: ExecutiveBoardSpotlightProps) {
  // Editorial mandates mapping to each executive officer role
  const editorialBios: Record<string, { tier: string; bio: string }> = {
    PRESIDENT: {
      tier: 'TIER I · EXECUTIVE LEAD',
      bio: 'Steers chapter strategy, institutional governance, and external representation across ECUSTA and EMSA-Ethiopia.',
    },
    'VP OF EXTERNAL AFFAIRS': {
      tier: 'TIER II · SENIOR COUNCIL (CLINICAL II)',
      bio: 'Builds bilateral partnerships with hospitals, health ministries, NGOs, and IFMSA international partner chapters.',
    },
    'VP OF CAPACITY BUILDING': {
      tier: 'TIER II · SENIOR COUNCIL (PRE-CLINICAL II)',
      bio: 'Coordinates peer mentorship, clinical simulation workshops, and extracurricular capacity building for medical students.',
    },
    'VP OF FINANCE': {
      tier: 'TIER II · SENIOR COUNCIL (PRE-CLINICAL II)',
      bio: 'Oversees chapter financial administration, sponsorship transparency, and budget allocation for committee campaigns.',
    },
    'VP OF ACTIVITIES': {
      tier: 'TIER III · OPERATIONS (PRE-CLINICAL I)',
      bio: 'Plans and coordinates community health drives, patient screening outreaches, and cross-committee interventions.',
    },
    'VP OF MEMBERS': {
      tier: 'TIER III · OPERATIONS (PRE-CLINICAL I)',
      bio: 'Champions student onboarding, cohort representation, and peer engagement across all academic medical years.',
    },
    'VP OF PR & COMMUNICATION': {
      tier: 'TIER III · COMMUNICATIONS (PRE-CLINICAL I)',
      bio: 'Leads chapter media dispatches, public health campaigns, brand voice, and digital healthcare journalism.',
    },
    'ASSISTANT - VP OF PR & COMMUNICATION': {
      tier: 'TIER III · COMMUNICATIONS SUPPORT (PRE-CLINICAL I)',
      bio: 'Assists media production, visual campaign design, telegram announcements, and event coverage.',
    },
  };

  const members: MemberWithEditorial[] = officers.map((off) => ({
    ...off,
    tier: editorialBios[off.role]?.tier || 'EXECUTIVE COUNCIL',
    bio:
      editorialBios[off.role]?.bio ||
      'Dedicated to advancing medical student excellence, health advocacy, and community leadership at ECUSTA.',
  }));

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isSwitching, setIsSwitching] = React.useState(false);
  const autoPlayRef = React.useRef<NodeJS.Timeout | null>(null);

  const activeMember = members[activeIndex] || members[0];
  const totalCount = members.length;

  const circumference = 930; // 2 * PI * r (r = 148)
  const ratio = (activeIndex + 1) / totalCount;
  const strokeOffset = circumference * (1 - ratio);
  const rotationDegrees = ratio * 360;

  const selectMember = React.useCallback(
    (index: number) => {
      setIsSwitching(true);
      setTimeout(() => {
        setActiveIndex((index + totalCount) % totalCount);
        setIsSwitching(false);
      }, 150);
    },
    [totalCount]
  );

  const stopAutoPlay = React.useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // Auto-cycle every 6.5s until user manually interacts
  React.useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCount);
    }, 6500);

    return () => stopAutoPlay();
  }, [totalCount, stopAutoPlay]);

  return (
    <div className="flex flex-col gap-8">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between border-b border-rule-subtle/50 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-content-secondary">
            Interactive Spotlight
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-content-secondary tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                stopAutoPlay();
                selectMember(activeIndex - 1);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-rule-subtle bg-surface text-content-primary hover:border-brand-gold hover:text-brand-gold transition-colors"
              aria-label="Previous member"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => {
                stopAutoPlay();
                selectMember(activeIndex + 1);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-rule-subtle bg-surface text-content-primary hover:border-brand-gold hover:text-brand-gold transition-colors"
              aria-label="Next member"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Spotlight Stage on Left, Hierarchical Dock on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT: Dynamic Orbital Spotlight Stage (7 cols) */}
        <div
          onMouseEnter={stopAutoPlay}
          className={cn(
            'lg:col-span-7 flex flex-col items-center text-center p-8 sm:p-12 rounded-2xl border border-rule-subtle bg-gradient-to-b from-surface/90 via-brand-midnight to-brand-midnight-deep shadow-2xl relative transition-all duration-300',
            isSwitching ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'
          )}
        >
          {/* Orbital Circle Container */}
          <div className="relative h-64 w-64 sm:h-72 sm:w-72 mb-6">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 320 320">
              {/* Outer Track */}
              <circle
                cx="160"
                cy="160"
                r="148"
                className="fill-none stroke-white/10"
                strokeWidth="2"
              />
              {/* Animated Gold Arc */}
              <circle
                cx="160"
                cy="160"
                r="148"
                className="fill-none stroke-brand-gold transition-all duration-700 ease-out"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
              />
            </svg>

            {/* Glowing Orbital Dot Rotator */}
            <div
              className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${rotationDegrees}deg)` }}
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-brand-gold shadow-[0_0_12px_#D4AF37]" />
            </div>

            {/* Center Portrait Circle */}
            <div className="absolute inset-5 rounded-full overflow-hidden border-2 border-brand-gold/40 bg-brand-midnight p-1 shadow-inner flex items-center justify-center">
              <SafeImage
                src={activeMember.portraitPath}
                alt={activeMember.fullName}
                width={250}
                height={250}
                className="h-full w-full rounded-full object-cover"
                fallbackText={activeMember.fullName}
              />
            </div>
          </div>

          {/* Member Details */}
          <div className="flex flex-col items-center max-w-lg">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-[10px] font-bold tracking-widest uppercase mb-3">
              {activeMember.tier}
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-content-primary">
              {activeMember.fullName}
            </h3>

            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-gold">
              {activeMember.role} • <span className="text-content-secondary">{activeMember.batchTier}</span>
            </p>

            <p className="mt-4 text-sm leading-relaxed text-content-secondary max-w-md">
              {activeMember.bio}
            </p>

            {/* Social channels */}
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-rule-subtle/50 text-content-secondary">
              {activeMember.socialLinks.telegram && (
                <a
                  href={activeMember.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-rule-subtle hover:border-brand-gold hover:text-brand-gold transition-colors"
                  aria-label="Telegram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                </a>
              )}
              {activeMember.socialLinks.linkedin && (
                <a
                  href={activeMember.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-rule-subtle hover:border-brand-gold hover:text-brand-gold transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.86 18.5v-8.37H5.07v8.37h2.79z" />
                  </svg>
                </a>
              )}
              {activeMember.socialLinks.email && (
                <a
                  href={`mailto:${activeMember.socialLinks.email}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-rule-subtle hover:border-brand-gold hover:text-brand-gold transition-colors"
                  aria-label="Email"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Hierarchical Selector Dock (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Tier I: Executive Lead */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-content-secondary/80 pl-1 block mb-2">
              Tier I — Executive Lead
            </span>
            {members.slice(0, 1).map((m, idx) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  stopAutoPlay();
                  selectMember(idx);
                }}
                className={cn(
                  'w-full text-left flex items-center gap-3.5 p-3 rounded-xl border transition-all duration-200',
                  activeIndex === idx
                    ? 'border-brand-gold bg-brand-gold/10 shadow-md ring-1 ring-brand-gold/30'
                    : 'border-rule-subtle bg-surface/80 hover:border-brand-gold/50 hover:bg-surface'
                )}
              >
                <span className="font-mono text-xs font-bold text-brand-gold min-w-[20px]">
                  01
                </span>
                <div className="flex flex-col">
                  <strong className="text-sm font-serif font-bold text-content-primary">
                    {m.fullName}
                  </strong>
                  <span className="text-xs text-content-secondary">
                    {m.role} • {m.batchTier}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Tier II: Senior Council (Year II) */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-content-secondary/80 pl-1 block mb-2">
              Tier II — Senior Council (Year II)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {members.slice(1, 4).map((m, i) => {
                const idx = i + 1;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      stopAutoPlay();
                      selectMember(idx);
                    }}
                    className={cn(
                      'w-full text-left flex items-center gap-3.5 p-2.5 rounded-xl border transition-all duration-200',
                      activeIndex === idx
                        ? 'border-brand-gold bg-brand-gold/10 shadow-md ring-1 ring-brand-gold/30'
                        : 'border-rule-subtle bg-surface/80 hover:border-brand-gold/50 hover:bg-surface'
                    )}
                  >
                    <span className="font-mono text-xs font-bold text-brand-gold min-w-[20px]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col">
                      <strong className="text-xs font-serif font-bold text-content-primary">
                        {m.fullName}
                      </strong>
                      <span className="text-[11px] text-content-secondary line-clamp-1">
                        {m.role}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tier III: Operations & PR (Year I) */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-content-secondary/80 pl-1 block mb-2">
              Tier III — Operations & PR (Year I)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {members.slice(4).map((m, i) => {
                const idx = i + 4;
                const isAssistant = idx === 7;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      stopAutoPlay();
                      selectMember(idx);
                    }}
                    className={cn(
                      'w-full text-left flex items-center gap-3.5 p-2.5 rounded-xl border transition-all duration-200',
                      isAssistant && 'border-dashed pl-6 bg-brand-midnight/40',
                      activeIndex === idx
                        ? 'border-brand-gold bg-brand-gold/10 shadow-md ring-1 ring-brand-gold/30'
                        : 'border-rule-subtle bg-surface/80 hover:border-brand-gold/50 hover:bg-surface'
                    )}
                  >
                    <span className="font-mono text-xs font-bold text-brand-gold min-w-[20px]">
                      {isAssistant ? '↳ 08' : String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col">
                      <strong className="text-xs font-serif font-bold text-content-primary">
                        {m.fullName}
                      </strong>
                      <span className="text-[11px] text-content-secondary line-clamp-1">
                        {m.role}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
