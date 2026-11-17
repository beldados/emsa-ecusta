import * as React from 'react';
import { StandingCommittee } from '@/types/committees';
import { Container } from '@/components/ui/container';
import { SafeImage } from '@/components/ui/safe-image';

interface CommitteeBatchGalleryProps {
  committee: StandingCommittee;
  activeTenureLabel: string;
}

export function CommitteeBatchGallery({ committee, activeTenureLabel }: CommitteeBatchGalleryProps) {
  // 6-Photo Responsive Grid
  const galleryItems = [
    { id: '1', title: `${committee.acronym} Activity 1`, path: `/assets/samples/sample-image.jpg` },
    { id: '2', title: `${committee.acronym} Activity 2`, path: `/assets/samples/sample-image.jpg` },
    { id: '3', title: `${committee.acronym} Activity 3`, path: `/assets/samples/sample-image.jpg` },
    { id: '4', title: `${committee.acronym} Activity 4`, path: `/assets/samples/sample-image.jpg` },
    { id: '5', title: `${committee.acronym} Activity 5`, path: `/assets/samples/sample-image.jpg` },
    { id: '6', title: `${committee.acronym} Activity 6`, path: `/assets/samples/sample-image.jpg` },
  ];

  return (
    <section className="py-16 border-b border-rule-subtle/50 bg-canvas">
      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: committee.colorTheme.primary }} />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-content-primary tracking-tight">
              Batch Gallery
            </h3>
          </div>
          <span className="text-xs text-content-secondary font-mono">
            {activeTenureLabel}
          </span>
        </div>

        {/* 6-Photo Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative h-60 w-full overflow-hidden rounded-xl border border-rule-subtle bg-brand-midnight hover:border-brand-gold transition-all duration-300 shadow-md"
            >
              <SafeImage
                src={item.path}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fallbackText={`Photo ${index + 1}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight-deep/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs font-semibold text-content-primary">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
