import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type CardVariant = 'default' | 'elevated' | 'ceremonial';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: 'bg-surface border border-rule-subtle',
  elevated: 'bg-surface-elevated border border-rule-subtle shadow-md',
  ceremonial: 'bg-surface border border-rule-gold/50 shadow-lg',
};

const PADDING_CLASSES: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg text-content-primary transition-colors',
        VARIANT_CLASSES[variant],
        PADDING_CLASSES[padding],
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-serif text-xl font-semibold leading-snug tracking-tight text-content-primary',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('font-sans text-sm text-content-secondary leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-4', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center justify-between gap-4 pt-4 mt-4 border-t border-rule-subtle',
      className
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
