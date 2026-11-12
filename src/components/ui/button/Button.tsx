import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-gold text-brand-midnight-deep hover:bg-brand-gold-hover shadow-sm font-semibold',
  secondary:
    'bg-surface-elevated text-content-primary border border-rule-subtle hover:border-rule-gold',
  outline:
    'bg-transparent border border-rule-gold text-content-gold hover:bg-brand-gold/10',
  ghost:
    'bg-transparent text-content-secondary hover:text-content-primary hover:bg-surface-elevated/60',
  danger:
    'bg-brand-crimson text-white hover:bg-brand-crimson/90 shadow-sm font-semibold',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
  md: 'h-10 px-4 text-sm rounded-md gap-2',
  lg: 'h-12 px-6 text-base rounded-lg gap-2.5',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      type = 'button',
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = Boolean(disabled || isLoading);

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap font-sans transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          'disabled:pointer-events-none disabled:opacity-50',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
