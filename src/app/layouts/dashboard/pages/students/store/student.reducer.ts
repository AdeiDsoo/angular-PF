import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';
import { IStudent } from '../models';

export const studentFeatureKey = 'student';

export interface State {
  students: IStudent[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
students:[],
isLoading:false,
error:null
};

export const reducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(StudentActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      students: action.data,
      isLoading: false,
    };
  }),
  on(StudentActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(StudentActions.createStudent, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(StudentActions.createStudentsSuccess, (state, action) => {
    return {
      ...state,
      students: [...state.students, action.data],
      isLoading: false,
    };
  }),
  on(StudentActions.createStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(StudentActions.deleteStudentByID, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(StudentActions.deleteStudentsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    students: state.students.filter((el) => el.id !== action.data.id),
  })),
  on(StudentActions.deleteStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(StudentActions.updateStudentByID, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(StudentActions.updateStudentsSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    students: state.students.map((s) =>
      s.id === data.id ? { ...s, ...data } : s
    ),
  })),
  on(StudentActions.updateStudentsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(StudentActions.getStudentByID, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(StudentActions.getStudentByIDSuccess, (state, action) => ({
    ...state,
    selectedStudent: action.data,
    isLoading: false,
  })),
  on(StudentActions.getStudentByIDFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  }))
);

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});

