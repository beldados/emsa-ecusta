import * as React from 'react';
import { CoreValue } from '@/types/governance';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CoreValuesGridProps {
  values: CoreValue[];
}

export function CoreValuesGrid({ values }: CoreValuesGridProps) {
  return (
    <Card className="border-rule-subtle bg-surface/90">
      <CardHeader className="pb-4 border-b border-rule-subtle/50">
        <CardTitle className="flex items-center gap-2 text-lg font-serif text-content-primary">
          <span className="text-brand-gold">★</span>
          <span>Our Core Values</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((val) => (
            <div key={val.id} className="flex items-start gap-2.5">
              <span className="text-brand-gold text-sm font-bold">✓</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-content-primary">
                  {val.title}
                </span>
                {val.description && (
                  <span className="text-xs text-content-secondary mt-0.5">
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
