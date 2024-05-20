import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from './course.reducer';

export const selectCourseState = createFeatureSelector<fromCourse.State>(
  fromCourse.courseFeatureKey
);

export const selectCoursesList = createSelector(
  selectCourseState,
  (c) => c.courses
);

export const selectIsloading = createSelector(
  selectCourseState,
  (c) => c.isLoading
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (c) => c.error
);
