import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { StudentActions } from './student.actions';
import { StudentService } from '../students.service';


@Injectable()
export class StudentEffects {
  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      concatMap(() =>
        this.studentService.getStudents().pipe(
          map((data) => StudentActions.loadStudentsSuccess({ data })),
          catchError((error) =>
            of(StudentActions.loadStudentsFailure({ error }))
          )
        )
      )
    );
  });

  createdStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.createStudent),
      concatMap((action) =>
        this.studentService.createdStudent(action.payload).pipe(
          map((data) => StudentActions.createStudentsSuccess({ data })),
          catchError((error) =>
            of(StudentActions.createStudentsFailure({ error }))
          )
        )
      )
    );
  });

  deleteStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.deleteStudentByID),
      concatMap((action) =>
        this.studentService.deleteStudentById(action.id).pipe(
          map((data) => StudentActions.deleteStudentsSuccess({ data })),
          catchError((error) =>
            of(StudentActions.deleteStudentsFailure({ error }))
          )
        )
      )
    );
  });

  updateStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.updateStudentByID),
      concatMap((action) =>
        this.studentService.updateStudentById(action.id, action.data).pipe(
          map((data) => StudentActions.updateStudentsSuccess({ data })),
          catchError((error) =>
            of(StudentActions.updateStudentsFailure({ error }))
          )
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private studentService: StudentService
  ) {}
}
