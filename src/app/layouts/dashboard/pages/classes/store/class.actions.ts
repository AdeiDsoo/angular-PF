import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IClass } from '../models';

export const ClassActions = createActionGroup({
  source: 'Class',
  events: {
    'Load Classs': emptyProps(),
    'Load Classs Success': props<{ data: IClass[] }>(),
    'Load Classs Failure': props<{ error: unknown }>(),
  }
});
