import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IClass, ICreateClassesData } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const ClassActions = createActionGroup({
  source: 'Class',
  events: {
    'Load Classs': emptyProps(),
    'Load Classs Success': props<{ data: IClass[] }>(),
    'Load Classs Failure': props<{ error: unknown }>(),

    'Create Class': props<{ payload: ICreateClassesData }>(),
    'Create Class Success': props<{ data: IClass }>(),
    'Create Class Failure': props<{ error: unknown }>(),

    'Delete Class by ID': props<{ id: string }>(),
    'Delete Class Success': props<{ data: IClass }>(),
    'Delete Class Failure': props<{ error: HttpErrorResponse }>(),

    'Update Class': props<{ id: string; data: IClass }>(),
    'Update Class Success': props<{ data: IClass }>(),
    'Update Class Failure': props<{ error: HttpErrorResponse }>(),
  },
});
