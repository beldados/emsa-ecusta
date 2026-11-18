import { Metadata } from 'next';
import { academyRepo } from '@/lib/dal';
import { Container } from '@/components/ui/container';
import {
  AcademyHero,
  CourseCard,
  CertificateTeaserBanner,
} from '@/components/features/academy';

export const metadata: Metadata = {
  title: 'EMSA Academy | Practical Skills for Student Physicians',
  description:
    'Self-paced extracurricular masterclasses in media, photography, video editing, and project management for medical students at ECUSTA.',
};

export default async function AcademyCatalogPage() {
  const courses = await academyRepo.getAllCourses();

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* 1. Hero with Email Gate */}
      <AcademyHero />

      {/* 2. Core Curriculum Grid */}
      <section className="py-16">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
                THE ACADEMY CURRICULUM
              </span>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-content-primary">
                Four tracks. Skills that make a difference.
              </h2>
            </div>
            <span className="text-xs font-mono font-semibold text-content-secondary">
              04 CORE COURSES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Verifiable Certificate Teaser Banner */}
      <CertificateTeaserBanner />
    </div>
  );
}
