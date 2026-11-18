import * as React from 'react';
import { Container } from '@/components/ui/container';

export function CertificateTeaserBanner() {
  return (
    <section className="py-16 bg-brand-midnight-deep/60">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl border border-rule-subtle bg-surface/80 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl border border-brand-gold/40 bg-brand-gold/10 flex items-center justify-center text-2xl shrink-0">
              🏅
            </div>
            <div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-content-primary">
                Automatic Verifiable Certificates
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-content-secondary leading-relaxed">
                Complete 100% of lessons and upload your 1 final project link to generate your
                authenticated certificate with a tamper-proof QR code.
              </p>
            </div>
          </div>

          <div className="shrink-0 p-4 rounded-xl border border-rule-subtle bg-brand-midnight text-center">
            <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">
              EMSA-ECUSTA / ACADEMY
            </span>
            <span className="text-xs font-serif font-bold text-content-primary mt-1 block">
              Certificate of Completion
            </span>
            <span className="text-[9px] text-content-secondary mt-0.5 block">
              Tamper-proof SHA-256 Ledger
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
