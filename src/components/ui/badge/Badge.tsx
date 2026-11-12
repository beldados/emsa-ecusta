import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type BadgeVariant =
  | 'default'
  | 'gold'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-surface-elevated text-content-secondary border border-rule-subtle',
  gold: 'bg-brand-gold/15 text-content-gold border border-rule-gold/40',
  success: 'bg-status-success/15 text-status-success border border-status-success/35',
  warning: 'bg-status-warning/15 text-status-warning border border-status-warning/35',
  danger: 'bg-status-danger/15 text-status-danger border border-status-danger/35',
  outline: 'bg-transparent text-content-primary border border-rule-subtle',
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px] leading-4',
  md: 'px-2.5 py-0.5 text-xs leading-5',
};

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-sans font-medium tracking-wide whitespace-nowrap',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    />
  );
}
