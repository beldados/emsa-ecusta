'use client';

import * as React from 'react';
import { ExecutiveOfficer } from '@/types/governance';
import { SafeImage } from '@/components/ui/safe-image';

interface ExecutiveCardProps {
  officer: ExecutiveOfficer;
}

export function ExecutiveCard({ officer }: ExecutiveCardProps) {
  // Editorial mandates tailored to each executive role
  const editorialBios: Record<string, { tier: string; bio: string }> = {
    PRESIDENT: {
      tier: 'TIER I · EXECUTIVE LEAD',
      bio: 'Steers chapter strategy, institutional governance, and external representation across ECUSTA and EMSA-Ethiopia.',
    },
    'VP OF EXTERNAL AFFAIRS': {
      tier: 'TIER II · SENIOR COUNCIL',
      bio: 'Builds bilateral partnerships with hospitals, health ministries, NGOs, and IFMSA international partner chapters.',
    },
    'VP OF CAPACITY BUILDING': {
      tier: 'TIER II · SENIOR COUNCIL',
      bio: 'Coordinates peer mentorship, clinical simulation workshops, and extracurricular training programs.',
    },
    'VP OF FINANCE': {
      tier: 'TIER II · SENIOR COUNCIL',
      bio: 'Oversees chapter financial administration, sponsorship transparency, and budget allocation for initiatives.',
    },
    'VP OF ACTIVITIES': {
      tier: 'TIER III · OPERATIONS',
      bio: 'Plans and coordinates community health drives, patient screening outreaches, and cross-committee campaigns.',
    },
    'VP OF MEMBERS': {
      tier: 'TIER III · OPERATIONS',
      bio: 'Champions student onboarding, cohort representation, and peer engagement across all academic years.',
    },
    'VP OF PR & COMMUNICATION': {
      tier: 'TIER III · COMMUNICATIONS',
      bio: 'Leads chapter media dispatches, public health campaigns, brand voice, and digital healthcare journalism.',
    },
    'ASSISTANT - VP OF PR & COMMUNICATION': {
      tier: 'TIER III · COMMUNICATIONS SUPPORT',
      bio: 'Assists media production, visual campaign design, telegram announcements, and event field coverage.',
    },
  };

  const editorial = editorialBios[officer.role] || {
    tier: 'EXECUTIVE COUNCIL',
    bio: 'Dedicated to advancing medical student excellence, health advocacy, and community leadership at ECUSTA.',
  };

  return (
    <div className="group relative h-[360px] w-full rounded-2xl border border-rule-subtle bg-surface/90 overflow-hidden transition-all duration-500 hover:border-brand-gold hover:shadow-2xl hover:shadow-brand-gold/10 hover:-translate-y-1">
      {/* ============================================================
          BASE CARD (Visible at Rest)
          ============================================================ */}
      <div className="flex flex-col items-center justify-center h-full p-6 text-center transition-transform duration-500 group-hover:scale-95">
        {/* Gold Ring Portrait */}
        <div className="relative mb-5 h-32 w-32 rounded-full border-2 border-rule-subtle group-hover:border-brand-gold/80 transition-colors duration-500 overflow-hidden bg-brand-midnight p-1 shadow-lg">
          <SafeImage
            src={officer.portraitPath}
            alt={officer.fullName}
            width={128}
            height={128}
            className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
            fallbackText={officer.fullName}
          />
        </div>

        <h4 className="font-serif text-lg font-bold text-content-primary tracking-tight">
          {officer.fullName}
        </h4>

        <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-brand-gold">
          {officer.role}
        </span>

        <span className="mt-1 text-xs text-content-secondary">
          {officer.batchTier}
        </span>

        {/* Hover hint indicator */}
        <div className="mt-4 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-content-secondary/60 opacity-60 group-hover:opacity-0 transition-opacity">
          <span>Hover to explore</span>
          <span>↓</span>
        </div>
      </div>

      {/* ============================================================
          TRANSFORM OVERLAY (Glides Up Smoothly on Hover)
          ============================================================ */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 bg-brand-midnight-deep/95 backdrop-blur-md border-t-2 border-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
        {/* Top: Tier badge & close/info mark */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-brand-gold/40 bg-brand-gold/10 text-brand-gold text-[9px] font-bold tracking-widest uppercase">
            {editorial.tier}
          </span>
          <span className="text-xs text-brand-gold font-mono">0{officer.rankOrder}</span>
        </div>

        {/* Middle: Details & Mandate Statement */}
        <div className="flex flex-col my-auto">
          <h4 className="font-serif text-xl font-bold text-content-primary tracking-tight">
            {officer.fullName}
          </h4>

          <span className="mt-0.5 text-xs font-bold uppercase tracking-wider text-brand-gold">
            {officer.role}
          </span>

          <span className="text-[11px] text-content-secondary mb-3">
            {officer.batchTier}
          </span>

          <p className="text-xs leading-relaxed text-content-secondary line-clamp-4 border-t border-rule-subtle/50 pt-3">
            "{editorial.bio}"
          </p>
        </div>

        {/* Bottom: Interactive Contact Triggers */}
        <div className="flex items-center justify-center gap-3 pt-3 border-t border-rule-subtle/50 text-content-secondary">
          {officer.socialLinks.telegram && (
            <a
              href={officer.socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-rule-subtle bg-surface hover:border-brand-gold hover:text-brand-gold hover:bg-brand-midnight transition-colors"
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
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-rule-subtle bg-surface hover:border-brand-gold hover:text-brand-gold hover:bg-brand-midnight transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.86 18.5v-8.37H5.07v8.37h2.79z" />
              </svg>
            </a>
          )}
          {officer.socialLinks.email && (
            <a
              href={`mailto:${officer.socialLinks.email}`}
              aria-label="Email"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-rule-subtle bg-surface hover:border-brand-gold hover:text-brand-gold hover:bg-brand-midnight transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
