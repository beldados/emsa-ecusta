import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'neutral' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'neutral', size = 'sm', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full uppercase tracking-wider';

  const variants = {
    gold: 'bg-brand-gold/15 text-brand-gold border border-brand-gold/40',
    neutral: 'bg-surface-elevated text-content-secondary border border-rule-subtle',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    danger: 'bg-brand-crimson/15 text-red-400 border border-brand-crimson/30',
    outline: 'border border-rule-subtle text-content-secondary',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
