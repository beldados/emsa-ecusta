import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { academyRepo } from '@/lib/dal';
import { CourseWorkspace } from '@/components/features/academy';

interface CoursePageProps {
  params: Promise<{ courseSlug: string }> | { courseSlug: string };
}

export async function generateStaticParams() {
  const courses = await academyRepo.getAllCourses();
  return courses.map((c) => ({
    courseSlug: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseSlug: string }> | { courseSlug: string } }): Promise<Metadata> {
  const { courseSlug } = await Promise.resolve(params);
  const course = await academyRepo.getCourseBySlug(courseSlug);

  if (!course) return { title: 'Course Not Found | EMSA Academy' };

  return {
    title: `${course.title} | EMSA Academy`,
    description: course.summary,
  };
}

export default async function CoursePlayerPage({ params }: CoursePageProps) {
  const { courseSlug } = await Promise.resolve(params);
  const course = await academyRepo.getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  return <CourseWorkspace course={course} />;
}
