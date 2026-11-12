'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MobileDrawer } from '../mobile-drawer';

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const navLinks = [
    { label: 'ABOUT', href: '/#about' },
    { label: 'COMMITTEES', href: '/#committees' },
    { label: 'ARCHIVE', href: '/archive' },
    { label: 'Academy', href: '/academy' },
    { label: 'NEWS', href: '/#news' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rule-subtle bg-brand-midnight-deep/90 backdrop-blur-md">
      {/* Top micro-bar */}
      <div className="border-b border-rule-subtle/50 bg-brand-midnight py-1 text-[11px] text-content-secondary">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Official Medical Student Association • Catholic University of Health Sciences (ECUSTA)</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="https://t.me/emsa_ecusta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-content-gold hover:underline"
            >
              <span>Official Telegram</span>
              <span>↗</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main navigation bar */}
      <Container className="flex h-16 items-center justify-between">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-rule-gold bg-brand-midnight">
            <span className="font-serif text-lg font-bold text-brand-gold">E</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base font-bold tracking-tight text-content-primary group-hover:text-brand-gold transition-colors">
              EMSA-ECUSTA
            </span>
            <span className="text-[9px] uppercase tracking-widest text-content-secondary">
              Medical Students&apos; Association
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-wider text-content-primary hover:text-brand-gold transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href="https://t.me/emsa_ecusta" target="_blank" rel="noopener noreferrer">
              Telegram ↗
            </a>
          </Button>
          <Button variant="primary" size="sm">
            GET IN TOUCH
          </Button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-content-primary hover:text-brand-gold focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
