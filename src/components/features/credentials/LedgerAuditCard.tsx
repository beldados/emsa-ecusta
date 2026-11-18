import * as React from 'react';
import { PublicVerificationResult } from '@/types/credentials';

interface LedgerAuditCardProps {
  verification: PublicVerificationResult;
}

export function LedgerAuditCard({ verification }: LedgerAuditCardProps) {
  const isAuthentic = verification.isAuthentic;

  return (
    <div className="no-print flex flex-col rounded-3xl border border-rule-subtle bg-surface/90 p-6 sm:p-8 shadow-2xl space-y-6">
      {/* 1. Status Shield Banner */}
      <div
        className={`flex items-center gap-3 p-3.5 rounded-2xl border text-xs font-bold uppercase tracking-wider ${
          isAuthentic
            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
            : 'border-red-500/40 bg-red-500/10 text-red-400'
        }`}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-sm">
          {isAuthentic ? '🛡️' : '⚠️'}
        </div>
        <span>
          {isAuthentic ? 'AUTHENTIC CHAPTER RECORD VERIFIED' : 'TAMPER DETECTED / RECORD REVOKED'}
        </span>
      </div>

      {/* 2. Heading & Subtitle */}
      <div>
        <h3 className="font-serif text-2xl font-bold text-content-primary tracking-tight">
          Credential Authentication
        </h3>
        <p className="mt-1 text-xs text-content-secondary leading-relaxed">
          {isAuthentic
            ? 'This official digital record is permanently registered in the EMSA-ECUSTA academic ledger. Tamper verification passed.'
            : 'This certificate could not be cryptographically validated or has been officially revoked by chapter authorities.'}
        </p>
      </div>

      {/* 3. Audit Ledger Metadata Rows */}
      <div className="border-t border-rule-subtle/50 pt-4 space-y-3.5 text-xs">
        <div className="flex justify-between items-start gap-4">
          <span className="text-content-secondary font-medium">Recipient</span>
          <span className="font-semibold text-content-primary text-right">
            {verification.recipientDisplay}
          </span>
        </div>

        <div className="flex justify-between items-start gap-4">
          <span className="text-content-secondary font-medium">Institution</span>
          <span className="font-semibold text-content-primary text-right">
            {verification.institution}
          </span>
        </div>

        <div className="flex justify-between items-start gap-4">
          <span className="text-content-secondary font-medium">Course Completed</span>
          <span className="font-semibold text-brand-gold text-right">
            {verification.courseTitle}
          </span>
        </div>

        <div className="flex justify-between items-start gap-4">
          <span className="text-content-secondary font-medium">Issued By</span>
          <span className="font-semibold text-content-primary text-right">
            Executive Board (Capacity Building Directorate)
          </span>
        </div>

        <div className="flex justify-between items-start gap-4">
          <span className="text-content-secondary font-medium">Issuance Date</span>
          <span className="font-semibold text-content-primary text-right font-mono">
            {verification.issueDate}
          </span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <span className="text-content-secondary font-medium">Record Status</span>
          <span className="px-2.5 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-400 font-bold text-[10px]">
            {verification.recordStatus}
          </span>
        </div>

        {/* Cryptographic Hash */}
        <div className="pt-2 border-t border-rule-subtle/50 flex flex-col gap-1.5">
          <span className="text-[11px] font-medium text-content-secondary">
            Cryptographic Hash (SHA-256)
          </span>
          <span className="font-mono text-[10px] text-brand-gold bg-brand-midnight p-2 rounded-lg border border-rule-subtle break-all select-all">
            {verification.cryptographicHash}
          </span>
        </div>
      </div>

      {/* 4. Constitutional Authority Clause */}
      <div className="border-t border-rule-subtle/50 pt-4 text-[11px] text-content-secondary/80 leading-relaxed">
        Issued under the authority of the EMSA-ECUSTA constitution. For academic accreditation
        inquiries, contact the VP of Capacity Building.
      </div>
    </div>
  );
}
