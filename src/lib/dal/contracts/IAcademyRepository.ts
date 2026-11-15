import { AcademyCourse, AcademyLesson } from '@/types/academy';

export interface IAcademyRepository {
  getAllCourses(): Promise<AcademyCourse[]>;
  getCourseBySlug(slug: string): Promise<AcademyCourse | null>;
  getCourseLessons(courseSlug: string): Promise<AcademyLesson[]>;
}
