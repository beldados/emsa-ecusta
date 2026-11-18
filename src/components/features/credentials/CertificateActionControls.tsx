'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CertificateActionControlsProps {
  certificateId: string;
}

export function CertificateActionControls({ certificateId }: CertificateActionControlsProps) {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}/verify/${certificateId}`
      : `/verify/${certificateId}`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/academy" className="flex items-center gap-2 text-content-secondary hover:text-brand-gold">
          <span>←</span>
          <span>Back to Learner Dashboard</span>
        </Link>
      </Button>

      <div className="flex items-center gap-3">
        <Button onClick={handlePrint} variant="primary" size="sm" className="font-semibold flex items-center gap-1.5 shadow-md">
          <span>Download Official PDF</span>
          <span>↓</span>
        </Button>
        <Button onClick={handleShare} variant="outline" size="sm" className="flex items-center gap-1.5">
          <span>{copied ? 'Link Copied ✓' : 'Share Credential'}</span>
          <span>↗</span>
        </Button>
      </div>
    </div>
  );
}
