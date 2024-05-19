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
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.classesServices.getClass().pipe(
          map(data => ClassActions.loadClasssSuccess({ data })),
          catchError(error => of(ClassActions.loadClasssFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private classesServices: ClassesServices) {}
}
