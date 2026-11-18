'use client';

import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { OnboardingModal } from './OnboardingModal';

export function AcademyHero() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [emailInput, setEmailInput] = React.useState('');

  const handleOpenRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="py-20 lg:py-28 text-center bg-gradient-to-b from-brand-midnight to-canvas">
      <Container className="max-w-4xl">
        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
          PEER CAPACITY BUILDING • EMSA ACADEMY
        </span>

        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-bold tracking-tight text-content-primary">
          Practical Skills for Student Physicians.
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-content-secondary">
          Self-paced extracurricular masterclasses in media, design, and management. Watch embedded
          lessons, submit 1 final capstone project, and earn an authenticated chapter certificate.
        </p>

        {/* Quick Email Gate Bar */}
        <form
          onSubmit={handleOpenRegister}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto"
        >
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="student@ecusta.edu.et"
            className="w-full rounded-lg border border-rule-subtle bg-surface px-4 py-2.5 text-xs text-content-primary placeholder:text-content-secondary/60 focus:border-brand-gold focus:outline-none shadow-sm"
          />
          <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto shrink-0 font-semibold">
            Sign In / Register →
          </Button>
        </form>

        <span className="mt-2 text-[11px] text-content-secondary block">
          Access restricted to Catholic University of Health Sciences students.
        </span>

        {/* Onboarding Modal */}
        <OnboardingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          defaultEmail={emailInput}
        />
      </Container>
    </div>
  );
}
