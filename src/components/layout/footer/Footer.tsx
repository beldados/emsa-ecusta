import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';

export function Footer() {
  const standingCommittees = [
    { acronym: 'SCOME', name: 'Medical Education' },
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
            <ul className="mt-4 space-y-2 text-sm text-content-secondary">
              {standingCommittees.map((sc) => (
                <li key={sc.acronym}>
                  <Link
                    href={`/committees/${sc.acronym.toLowerCase()}`}
                    className="hover:text-brand-gold transition-colors"
                  >
                    <span className="font-semibold text-content-primary">{sc.acronym}</span>{' '}
                    <span>({sc.name})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-rule-subtle pt-6 text-xs text-content-secondary sm:flex-row">
          <p>© 2026 EMSA-ECUSTA. All rights reserved.</p>
          <p className="tracking-wide">
            Designed by <span className="text-brand-gold font-medium">beldados</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
