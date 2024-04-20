import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CoursesService } from './courses.service';
import { CoursesMockService } from './courses-mock.service';

export const API_URL = new InjectionToken('API_URL');
export const RANDOM_NUMBER = new InjectionToken('RANDOM_NUMBER');
export const COURSES = new InjectionToken('COURSES');

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
  exports: [CoursesComponent],
  providers: [
    CoursesService,
    {
      provide: CoursesService,
      // useClass:CoursesMockService,
      useClass: CoursesService,
    },
    {
      provide: API_URL,
      useValue: 'htttp://localhost:8080',
    },
    {
      provide: RANDOM_NUMBER,
      useFactory: () => {
        return Math.random();
      },
    },
    {
      provide: COURSES,
      useFactory: (coursesServices: CoursesService) => {
        return coursesServices.getCourse();
      },
      deps: [CoursesService],
    },
  ],
})
export class CoursesModule {}
