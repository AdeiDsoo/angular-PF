import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './student.reducer';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.studentFeatureKey
);
export const selectStudentList = createSelector(
  selectStudentState,
  (s) => s.students
);

export const selectIsloading = createSelector(
  selectStudentState,
  (s) => s.isLoading
);

export const selectStudentError = createSelector(
  selectStudentState,
  (s) => s.error
);
