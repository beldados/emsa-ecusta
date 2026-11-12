'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ label: string; href: string }>;
}

export function MobileDrawer({ isOpen, onClose, links }: MobileDrawerProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer surface */}
      <div className="relative ml-auto flex h-full w-full max-w-xs flex-col border-l border-rule-subtle bg-surface p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-6 border-b border-rule-subtle">
          <span className="font-serif text-lg font-bold text-brand-gold">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-content-secondary hover:text-content-primary focus:outline-none"
            aria-label="Close Navigation Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links list */}
        <nav className="flex flex-col gap-4 py-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="text-sm font-medium uppercase tracking-wider text-content-primary hover:text-brand-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-rule-subtle">
          <Button variant="outline" size="sm" asChild>
            <a href="https://t.me/emsa_ecusta" target="_blank" rel="noopener noreferrer">
              Official Telegram ↗
            </a>
          </Button>
          <Button variant="primary" size="sm" onClick={onClose}>
            GET IN TOUCH
          </Button>
        </div>
      </div>
    </div>
  );
}
