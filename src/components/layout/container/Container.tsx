import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  size?: ContainerSize;
  as?: 'div' | 'section' | 'main' | 'article';
}

const SIZE_CLASSES: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-full',
};

export function Container({
  className,
  size = 'lg',
  as: Component = 'div',
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    />
  );
}
