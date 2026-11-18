import * as React from 'react';
import { CoreValue } from '@/types/governance';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CoreValuesGridProps {
  values: CoreValue[];
}

export function CoreValuesGrid({ values }: CoreValuesGridProps) {
  return (
    <Card className="border-rule-subtle bg-surface/90 p-8 sm:p-10 shadow-xl">
      <CardHeader className="p-0 pb-6 border-b border-rule-subtle/50 mb-6">
        <CardTitle className="flex items-center gap-2.5 text-xl font-serif text-content-primary">
          <span className="text-brand-gold text-lg">★</span>
          <span>Our Core Values</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((val) => (
            <div key={val.id} className="flex items-start gap-3">
              <span className="text-brand-gold text-base font-bold shrink-0 mt-0.5">✓</span>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-semibold text-content-primary">
                  {val.title}
                </span>
                {val.description && (
                  <span className="text-xs sm:text-sm text-content-secondary mt-1 leading-relaxed">
                    {val.description}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
