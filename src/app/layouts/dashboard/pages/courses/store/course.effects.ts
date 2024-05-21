import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CourseActions } from './course.actions';
import { CoursesService } from '../courses.service';

@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCourse().pipe(
          map((data) => CourseActions.loadCoursesSuccess({ data })),
          catchError((error) => of(CourseActions.loadCoursesFailure({ error })))
        )
      )
    );
  });

  createCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.createCourse),
      concatMap((action) =>
        this.coursesService.createCourse(action.payload).pipe(
          map((data) => CourseActions.createCoursesSuccess({ data })),
          catchError((error) =>
            of(CourseActions.createCoursesFailure({ error }))
          )
        )
      )
    );
  });

  deleteCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.deleteCourseByID),
      concatMap((action) =>
        this.coursesService.deleteCourseById(action.id).pipe(
          map((data) => CourseActions.deleteCoursesSuccess({ data })),
          catchError((error) =>
            of(CourseActions.deleteCoursesFailure({ error }))
          )
        )
      )
    );
  });
  updateCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.updateCourseByID),
      concatMap((action) =>
        this.coursesService.updateCourseById(action.id, action.data).pipe(
          map((data) => CourseActions.updateCoursesSuccess({ data })),
          catchError((error) =>
            of(CourseActions.updateCoursesFailure({ error }))
          )
        )
      )
    );
  });


  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
