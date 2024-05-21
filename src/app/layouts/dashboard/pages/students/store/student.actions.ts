import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateStudentPayload, IStudent } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: IStudent[] }>(),
    'Load Students Failure': props<{ error: unknown }>(),

    'Create Student': props<{ payload: CreateStudentPayload }>(),
    'Create Students Success': props<{ data: IStudent }>(),
    'Create Students Failure': props<{ error: unknown }>(),

    'Delete Student by ID': props<{ id: string }>(),
    'Delete Students Success': props<{ data: IStudent }>(),
    'Delete Students Failure': props<{ error: HttpErrorResponse }>(),

    'Update Student by ID': props<{ id: string; data: IStudent }>(),
    'Update Students Success': props<{ data: IStudent }>(),
    'Update Students Failure': props<{ error: HttpErrorResponse }>(),

    'Get Student by ID': props<{ id: string; }>(),
    'Get Student by ID Success': props<{ data: IStudent }>(),
    'Get Student by ID Failure': props<{ error: HttpErrorResponse }>(),
  },
});
