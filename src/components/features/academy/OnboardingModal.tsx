'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export function OnboardingModal({ isOpen, onClose, defaultEmail = '' }: OnboardingModalProps) {
  const [tab, setTab] = React.useState<'register' | 'login'>('register');
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState(defaultEmail);
  const [batchTier, setBatchTier] = React.useState('Pre-Clinical Year I');
  const [committee, setCommittee] = React.useState('scora');
  const [password, setPassword] = React.useState('');
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (defaultEmail) setEmail(defaultEmail);
  }, [defaultEmail]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Surface */}
      <div className="relative w-full max-w-lg rounded-2xl border border-rule-gold/50 bg-brand-midnight-deep p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        {/* Close trigger */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-content-secondary hover:text-content-primary p-1"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
              EMSA ACADEMY • STUDENT ONBOARDING
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-content-primary">
            {tab === 'register' ? 'Create Your Learner Profile' : 'Student Sign In'}
          </h3>
          <p className="mt-1 text-xs text-content-secondary leading-relaxed">
            {tab === 'register'
              ? 'Sign in with your university credentials to track video progress, submit capstone projects, and unlock verifiable chapter certificates.'
              : 'Enter your university email and password to access your active learning dashboard.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-surface mb-6 border border-rule-subtle">
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'register'
                ? 'bg-brand-midnight text-brand-gold shadow-sm border border-rule-gold/30'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            Register / New Student
          </button>
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'login'
                ? 'bg-brand-midnight text-brand-gold shadow-sm border border-rule-gold/30'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            Existing Student Sign In
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-medium text-content-primary mb-1">
                Official Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Mesula Wubliker"
                className="w-full rounded-lg border border-rule-subtle bg-surface px-3.5 py-2.5 text-xs text-content-primary placeholder:text-content-secondary/60 focus:border-brand-gold focus:outline-none"
              />
              <span className="text-[10px] text-content-secondary/80 mt-1 block">
                Must match your university ID (this exact name will appear on your issued certificates).
              </span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-content-primary mb-1">
              School / Institutional Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student.name@ecusta.edu.et"
              className="w-full rounded-lg border border-rule-subtle bg-surface px-3.5 py-2.5 text-xs text-content-primary placeholder:text-content-secondary/60 focus:border-brand-gold focus:outline-none"
            />
            <span className="text-[10px] text-content-secondary/80 mt-1 block">
              Only official university domains or approved chapter student emails are accepted.
            </span>
          </div>

          {tab === 'register' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-content-primary mb-1">
                  Medical School Batch
                </label>
                <select
                  value={batchTier}
                  onChange={(e) => setBatchTier(e.target.value)}
                  className="w-full rounded-lg border border-rule-subtle bg-surface px-3 py-2.5 text-xs text-content-primary focus:border-brand-gold focus:outline-none cursor-pointer"
                >
                  <option value="Pre-Clinical Year I">Pre-Clinical Year I</option>
                  <option value="Pre-Clinical Year II">Pre-Clinical Year II</option>
                  <option value="Clinical Year I">Clinical Year I</option>
                  <option value="Clinical Year II">Clinical Year II</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-content-primary mb-1">
                  Standing Committee / Group
                </label>
                <select
                  value={committee}
                  onChange={(e) => setCommittee(e.target.value)}
                  className="w-full rounded-lg border border-rule-subtle bg-surface px-3 py-2.5 text-xs text-content-primary focus:border-brand-gold focus:outline-none cursor-pointer"
                >
                  <option value="scora">SCORA • Reproductive Health</option>
                  <option value="scome">SCOME • Medical Education</option>
                  <option value="scoph">SCOPH • Public Health</option>
                  <option value="scope">SCOPE • Professional Exchange</option>
                  <option value="scorp">SCORP • Human Rights & Peace</option>
                  <option value="score">SCORE • Research Exchange</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-content-primary mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-lg border border-rule-subtle bg-surface px-3.5 py-2.5 text-xs text-content-primary placeholder:text-content-secondary/60 focus:border-brand-gold focus:outline-none"
            />
          </div>

          {tab === 'register' && (
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="confirm-student"
                required
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="mt-0.5 rounded border-rule-subtle text-brand-gold focus:ring-brand-gold"
              />
              <label htmlFor="confirm-student" className="text-[11px] text-content-secondary leading-normal">
                I confirm I am an enrolled student at Catholic University of Health Sciences (ECUSTA).
              </label>
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" className="w-full mt-4 font-semibold">
            {submitted
              ? 'Access Granted ✓'
              : tab === 'register'
              ? 'COMPLETE REGISTRATION & ENTER ACADEMY →'
              : 'SIGN IN & CONTINUE LEARNING →'}
          </Button>
        </form>

        {/* Security Footnote */}
        <div className="mt-6 pt-4 border-t border-rule-subtle/50 flex items-center gap-2 text-[10px] text-content-secondary">
          <span className="text-brand-gold text-xs">🔒</span>
          <span>
            Protected with SHA-256 verification. Certificate tampering is strictly prohibited under
            EMSA-ECUSTA academic bylaws.
          </span>
        </div>
      </div>
    </div>
  );
}
