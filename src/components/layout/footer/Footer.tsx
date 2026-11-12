import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';

export function Footer() {
  const standingCommittees = [
    { acronym: 'SCOME', name: 'Education' },
    { acronym: 'SCOPH', name: 'Public Health' },
    { acronym: 'SCORA', name: 'Reproductive Health' },
    { acronym: 'SCOPE', name: 'Exchange' },
    { acronym: 'SCORP', name: 'Human Rights' },
    { acronym: 'SCORE', name: 'Research' },
  ];

  const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'About EMSA', href: '/#about' },
    { label: 'Mission & Core Values', href: '/#values' },
    { label: 'Living Archive', href: '/archive' },
    { label: 'EMSA Academy', href: '/academy' },
    { label: 'News & Dispatches', href: '/#news' },
  ];

  const socialLinks = [
    {
      name: 'Telegram',
      href: 'https://t.me/emsa_ecusta',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/emsa-ecusta',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.86 18.5v-8.37H5.07v8.37h2.79z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/emsa.ecusta',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
    {
      name: 'Threads',
      href: 'https://www.threads.net/@emsa.ecusta',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:emsa.ecusta@gmail.com',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full border-t border-rule-subtle bg-brand-midnight text-content-primary">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Institutional Overview */}
          <div className="flex flex-col space-y-4 lg:col-span-2 pr-0 lg:pr-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-rule-gold bg-brand-midnight-deep">
                <span className="font-serif text-lg font-bold text-brand-gold">E</span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold tracking-tight text-content-primary">
                  EMSA-ECUSTA
                </h3>
                <p className="text-xs text-content-secondary">
                  Ethiopian Medical Students&apos; Association • ECUSTA Chapter
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-content-secondary">
              Ethiopian Catholic University of St. Thomas Aquinas. Empowering medical students through
              healthcare advocacy, clinical skills, and academic representation since 2022.
            </p>
            <div className="pt-2 text-xs text-content-secondary">
              Affiliated with EMSA-Ethiopia &amp; IFMSA • Addis Ababa, Ethiopia
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-content-secondary">
              {navigationLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-brand-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Standing Committees */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Standing Committees
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {standingCommittees.map((sc) => (
                <li key={sc.acronym}>
                  <Link
                    href={`/committees/${sc.acronym.toLowerCase()}`}
                    className="group inline-flex items-center gap-1.5 text-content-secondary hover:text-brand-gold transition-colors"
                  >
                    <span className="font-medium text-content-primary group-hover:text-brand-gold transition-colors">
                      {sc.acronym}
                    </span>
                    <span className="text-xs text-content-secondary/80">({sc.name})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social media connections bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-rule-subtle/70 pt-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-content-secondary">
              Connect:
            </span>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-rule-subtle bg-surface text-content-secondary hover:border-brand-gold hover:text-brand-gold hover:bg-brand-midnight-deep transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-content-secondary">
            <span>© 2026 EMSA-ECUSTA. All rights reserved.</span>
            <span>•</span>
            <span>
              Designed by <span className="text-brand-gold font-medium">beldados</span>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
