import * as React from 'react';
import Link from 'next/link';
import { AcademyCourse } from '@/types/academy';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  course: AcademyCourse;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="group flex flex-col justify-between overflow-hidden bg-surface/90 border border-rule-subtle hover:border-brand-gold transition-all duration-300 hover:shadow-2xl hover:shadow-brand-gold/5 rounded-2xl">
      <div>
        {/* Track Category Area */}
        <div className="relative h-44 w-full overflow-hidden bg-brand-midnight flex items-center justify-center p-6 border-b border-rule-subtle/50">
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-brand-gold/40 bg-brand-midnight-deep/90 text-brand-gold">
              {course.trackCategory}
            </span>
          </div>

          {/* Visual Category Symbol */}
          <div className="h-16 w-16 rounded-2xl border border-rule-subtle bg-surface/80 flex items-center justify-center text-2xl font-serif font-bold text-brand-gold group-hover:scale-110 transition-transform duration-300 shadow-md">
            {course.trackCategory[0]}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <CardHeader className="p-0">
            <CardTitle className="font-serif text-xl font-bold text-content-primary group-hover:text-brand-gold transition-colors line-clamp-1">
              {course.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 pt-3 text-xs leading-relaxed text-content-secondary line-clamp-3">
            {course.summary}
          </CardContent>

          {/* Meta details */}
          <div className="mt-5 pt-4 border-t border-rule-subtle/50 text-[11px] font-medium text-content-secondary flex flex-col gap-1">
            <span>• {course.totalLessons} Video Lessons</span>
            <span>• 1 Final Capstone Project</span>
            <span className="text-brand-gold font-semibold">• Certificate Included</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <CardFooter className="p-6 pt-0">
        <Button variant="primary" size="md" className="w-full font-semibold" asChild>
          <Link href={`/academy/${course.slug}`}>
            Start Course →
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
