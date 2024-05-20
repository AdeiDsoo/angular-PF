import { createFeature, createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';
import { ICourses } from '../models';

export const courseFeatureKey = 'course';

export interface State {
  courses: ICourses[];
  isLoading: boolean;
  error: unknown;

}

export const initialState: State = {
  courses: [],
  isLoading: false,
  error: null,

};

export const reducer = createReducer(
  initialState,
  on(CourseActions.loadCourses, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CourseActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.data,
      isLoading: false,
    };
  }),
  on(CourseActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(CourseActions.createCourse, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CourseActions.createCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: [...state.courses, action.data],
      isLoading: false,
    };
  }),
  on(CourseActions.createCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(CourseActions.deleteCourseByID, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CourseActions.deleteCoursesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    courses: state.courses.filter((el) => el.id !== action.data.id),
  })),
  on(CourseActions.deleteCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(CourseActions.updateCourseByID, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(CourseActions.updateCoursesSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    courses: state.courses.map((course) =>
      course.id === data.id ? { ...course, ...data } : course
    ),
  })),
  on(CourseActions.updateCoursesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);

export const courseFeature = createFeature({
  name: courseFeatureKey,
  reducer,
});
