'use client';

import * as React from 'react';
import { CertificateRecord } from '@/types/credentials';
import { SafeImage } from '@/components/ui/safe-image';
import { CertificateQRCode } from './CertificateQRCode';

interface CertificateDocumentProps {
  certificate: CertificateRecord;
}

export function CertificateDocument({ certificate }: CertificateDocumentProps) {
  const [origin, setOrigin] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const verificationUrl = origin
    ? `${origin}/verify/${certificate.certificateId}`
    : `/verify/${certificate.certificateId}`;

  return (
    <div className="certificate-print-canvas relative w-full max-w-4xl mx-auto rounded-3xl border-2 border-brand-gold p-3 bg-brand-midnight-deep shadow-2xl">
      {/* Inner Concentric Border Frame */}
      <div className="relative w-full rounded-2xl border border-brand-gold/60 p-8 sm:p-14 flex flex-col items-center text-center bg-gradient-to-b from-surface/80 via-brand-midnight to-brand-midnight-deep">
        {/* Subtle Watermark Background Crest */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <SafeImage
            src="/assets/branding/emsa-ecusta.jpg"
            alt="Watermark"
            width={400}
            height={400}
            className="object-contain"
            fallbackText="EMSA"
          />
        </div>

        {/* Top Emblem & Institution */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 rounded-full border border-brand-gold/60 bg-brand-midnight p-1 shadow-md mb-3">
            <SafeImage
              src="/assets/branding/emsa-ecusta.jpg"
              alt="EMSA-ECUSTA Crest"
              width={64}
              height={64}
              className="h-full w-full object-contain rounded-full"
              fallbackText="EMSA"
            />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold">
            ETHIOPIAN MEDICAL STUDENTS' ASSOCIATION • ECUSTA
          </span>
        </div>

        {/* Certificate Title */}
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-content-primary">
          Certificate of Competency
        </h2>

        <p className="mt-3 font-serif italic text-sm sm:text-base text-content-secondary">
          This is to certify that
        </p>

        {/* Recipient Full Name */}
        <div className="my-5 flex flex-col items-center">
          <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold tracking-wide">
            {certificate.recipientName}
          </span>
          <span className="mt-1 text-xs text-content-secondary font-medium">
            Clinical Year 2 • Catholic University of Health Sciences
          </span>
        </div>

        {/* Attestation Clause */}
        <p className="max-w-xl text-xs sm:text-sm text-content-secondary leading-relaxed mb-4">
          has successfully completed all curricular modules, practical workshops, and submitted the
          required chapter capstone project for:
        </p>

        {/* Certified Course Title */}
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-content-primary tracking-tight mb-12">
          {certificate.courseTitle}
        </h3>

        {/* Dual Signatures & Verified Rosette Seal */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-center gap-6 pt-6 border-t border-rule-subtle/60">
          {/* President Signature */}
          <div className="flex flex-col items-center text-center">
            <div className="h-10 flex items-center justify-center font-serif italic text-base text-content-secondary/80">
              [Signature]
            </div>
            <div className="w-40 h-0.5 bg-rule-subtle mb-1.5" />
            <span className="text-xs font-bold text-content-primary">
              {certificate.signatories?.president?.name || 'Mesula Wubliker'}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-content-secondary">
              {certificate.signatories?.president?.title || 'PRESIDENT, EMSA-ECUSTA'}
            </span>
          </div>

          {/* Central Verified Rosette Seal */}
          <div className="flex justify-center my-2 sm:my-0">
            <div className="flex flex-col items-center justify-center h-20 w-20 rounded-full border-2 border-brand-gold bg-brand-gold/10 text-brand-gold p-2 shadow-lg">
              <span className="text-lg">🎖️</span>
              <span className="text-[7px] font-bold uppercase tracking-tight text-center leading-tight mt-0.5">
                EMSA-ECUSTA VERIFIED
              </span>
            </div>
          </div>

          {/* VP Capacity Building Signature */}
          <div className="flex flex-col items-center text-center">
            <div className="h-10 flex items-center justify-center font-serif italic text-base text-content-secondary/80">
              [Signature]
            </div>
            <div className="w-40 h-0.5 bg-rule-subtle mb-1.5" />
            <span className="text-xs font-bold text-content-primary">
              {certificate.signatories?.vpCapacityBuilding?.name || 'Akinahom Molla'}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-content-secondary">
              {certificate.signatories?.vpCapacityBuilding?.title || 'VP OF CAPACITY BUILDING'}
            </span>
          </div>
        </div>

        {/* Bottom Verification Footer */}
        <div className="w-full mt-10 pt-4 border-t border-rule-subtle/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col items-center sm:items-start text-[11px] text-content-secondary font-mono">
            <span>Certificate ID: {certificate.certificateId}</span>
            <span>Date of Issue: {certificate.issueDate}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-content-secondary font-mono hidden sm:inline">
              Scan to verify authentic ledger record →
            </span>
            <div className="bg-white p-1 rounded-lg">
              <CertificateQRCode url={verificationUrl} size={70} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
