import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  variant?: 'gold' | 'emerald';
}

export function ProgressBar({ value, variant = 'gold', className, ...props }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const barColors = {
    gold: 'bg-brand-gold',
    emerald: 'bg-emerald-500',
  };

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-surface-elevated border border-rule-subtle', className)}
      {...props}
    >
      <div
        className={cn('h-full transition-all duration-300 ease-in-out', barColors[variant])}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
