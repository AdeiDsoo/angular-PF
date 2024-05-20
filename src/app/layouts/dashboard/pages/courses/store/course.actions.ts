import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICourses, ICreateCoursePayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: ICourses[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),

    'Create Course': props<{ payload: ICreateCoursePayload }>(),
    'Create Courses Success': props<{ data: ICourses }>(),
    'Create Courses Failure': props<{ error: unknown }>(),

    'Delete Course by ID': props<{ id: string }>(),
    'Delete Courses Success': props<{ data: ICourses }>(),
    'Delete Courses Failure': props<{ error: HttpErrorResponse }>(),

    'Update Course by ID': props<{ id: string; data: ICourses }>(),
    'Update Courses Success': props<{ data: ICourses }>(),
    'Update Courses Failure': props<{ error: HttpErrorResponse }>(),
  },
});
