import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ClassActions } from './class.actions';
import { ClassesServices } from '../classes.service';


@Injectable()
export class ClassEffects {
  loadClasss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClassActions.loadClasss),
      concatMap(() =>
        this.classesServices.getClass().pipe(
          map((data) => ClassActions.loadClasssSuccess({ data })),
          catchError((error) => of(ClassActions.loadClasssFailure({ error })))
        )
      )
    );
  });

  createCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClassActions.createClass),
      concatMap((action) =>
        this.classesServices.createClass(action.payload).pipe(
          map((data) => ClassActions.createClassSuccess({ data })),
          catchError((error) => of(ClassActions.createClassFailure({ error })))
        )
      )
    );
  });

  deleteClassByID$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClassActions.deleteClassByID),
      concatMap((action) =>
        this.classesServices.deleteClass(action.id).pipe(
          map((data) => ClassActions.deleteClassSuccess({ data })),
          catchError((error) => of(ClassActions.deleteClassFailure({ error })))
        )
      )
    );
  });

  updateClassbyId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClassActions.updateClass),
      concatMap((action) =>
        this.classesServices.updateClassById(action.id, action.data).pipe(
          map((data) => ClassActions.updateClassSuccess({ data })),
          catchError((error) =>
            of(ClassActions.updateClassFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private classesServices: ClassesServices
  ) {}
}
