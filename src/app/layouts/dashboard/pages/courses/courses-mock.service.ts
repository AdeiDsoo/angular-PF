import { ICourses } from './models';

export class CoursesMockService {
  getCourse(): ICourses[] {
    return [
      {
        id: 3,
        name: 'course mock 1',
        price: 9999,
        qty:6
      },
      {
        id: 4,
        name: 'Course mock 2',
        price: 2000,
        qty:30
      },
    ];
  }
}
