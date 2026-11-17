'use client';

import * as React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { AcademicTenure } from '@/types/governance';

interface BatchYearDropdownProps {
  tenures: AcademicTenure[];
  activeTenureId: string;
}

export function BatchYearDropdown({ tenures, activeTenureId }: BatchYearDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (selectedYear === tenures.find((t) => t.isCurrent)?.id) {
      params.delete('year');
    } else {
      params.set('year', selectedYear);
    }

    const query = params.toString() ? `?${params.toString()}` : '';
    router.push(`${pathname}${query}`);
  };

  const selectedTenure = tenures.find((t) => t.id === activeTenureId) || tenures[0];

  return (
    <div className="flex flex-col sm:items-end">
      <div className="relative inline-flex items-center">
        {/* Active glowing indicator dot */}
        <span
          className={`absolute left-3 h-2 w-2 rounded-full pointer-events-none z-10 ${
            selectedTenure.isCurrent ? 'bg-emerald-400 animate-pulse' : 'bg-content-secondary'
          }`}
        />

        {/* Custom styled select box */}
        <select
          value={activeTenureId}
          onChange={handleYearChange}
          className="appearance-none cursor-pointer rounded-lg border border-rule-subtle bg-surface/90 py-2.5 pl-8 pr-10 text-xs font-semibold text-content-primary hover:border-brand-gold focus:border-brand-gold focus:outline-none transition-colors shadow-sm"
          aria-label="Switch academic year batch records"
        >
          {tenures.map((tenure) => (
            <option key={tenure.id} value={tenure.id} className="bg-surface text-content-primary">
              Academic Year: {tenure.label} {tenure.isCurrent ? '(Active)' : `(${tenure.status})`}
            </option>
          ))}
        </select>

        {/* Custom chevron icon */}
        <div className="pointer-events-none absolute right-3 text-content-secondary text-xs">
          ▼
        </div>
      </div>

      <span className="mt-1.5 text-[11px] text-content-secondary">
        Switch year to browse past batch records
      </span>
    </div>
  );
}
