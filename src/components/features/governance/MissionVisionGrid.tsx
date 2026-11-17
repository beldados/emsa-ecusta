import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function MissionVisionGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
      {/* Our Mission */}
      <Card className="border-rule-subtle bg-surface/80 hover:border-rule-gold transition-colors">
        <CardHeader className="pb-3 flex flex-row items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-rule-gold/50 bg-brand-gold/10 text-brand-gold text-xs">
            ◎
          </div>
          <CardTitle className="text-lg font-serif text-content-primary">
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-content-secondary">
          To empower and unite medical students across ECUSTA and Ethiopia, fostering academic
          excellence, promoting health advocacy, and providing platforms for continuous professional
          development. We aim to enhance medical education through supplementary learning activities,
          clinical skills workshops, and impactful public health campaigns.
        </CardContent>
      </Card>

      {/* Our Vision */}
      <Card className="border-rule-subtle bg-surface/80 hover:border-rule-gold transition-colors">
        <CardHeader className="pb-3 flex flex-row items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-rule-gold/50 bg-brand-gold/10 text-brand-gold text-xs">
            ◉
          </div>
          <CardTitle className="text-lg font-serif text-content-primary">
            Our Vision
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-content-secondary">
          We envision a future where Ethiopian medical students are globally competitive, socially
          responsible, and equipped to transform the country's healthcare system. EMSA-ECUSTA aims to
          be the driving force in developing well-rounded healthcare leaders with strong clinical,
          research, and advocacy qualities.
        </CardContent>
      </Card>
    </div>
  );
}
