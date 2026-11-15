import coursesData from '@/data/courses.json';
import { IAcademyRepository } from '../contracts/IAcademyRepository';
import { AcademyCourse, AcademyLesson } from '@/types/academy';

export class JsonAcademyRepository implements IAcademyRepository {
  async getAllCourses(): Promise<AcademyCourse[]> {
    return coursesData.courses as AcademyCourse[];
  }

  async getCourseBySlug(slug: string): Promise<AcademyCourse | null> {
    const course = coursesData.courses.find((c) => c.slug === slug);
    return (course as AcademyCourse) || null;
  }

  async getCourseLessons(courseSlug: string): Promise<AcademyLesson[]> {
    const course = await this.getCourseBySlug(courseSlug);
    if (!course) return [];
    return course.modules.flatMap((m) => m.lessons);
  }
}
