import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

export interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackInitials?: string;
  fallbackClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackInitials,
  fallbackClassName = '',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // If error occurred or src is missing/empty, display the fallback initials monogram container
  if (hasError || !src) {
    const initials = fallbackInitials
      ? fallbackInitials.slice(0, 3).toUpperCase()
      : alt
          .split(' ')
          .filter(Boolean)
          .slice(0, 2)
          .map((word) => word[0])
          .join('')
          .toUpperCase() || 'EMSA';

    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-brand-navy-800/80 border border-brand-navy-700 text-brand-gold font-bold select-none transition-colors ${className} ${fallbackClassName}`}
      >
        <span className="text-xs sm:text-sm tracking-widest">{initials}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};
