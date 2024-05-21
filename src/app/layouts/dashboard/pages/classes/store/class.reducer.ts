import { createFeature, createReducer, on } from '@ngrx/store';
import { ClassActions } from './class.actions';
import { IClass } from '../models';

export const classFeatureKey = 'class';

export interface State {
  loadingClasses: boolean;
  classes: IClass[];
  error: unknown;
}

export const initialState: State = {
  loadingClasses: false,
  classes: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ClassActions.loadClasss, (state) => {
    return { ...state, loadingClasses: true };
  }),
  on(ClassActions.loadClasssSuccess, (state, action) => {
    return {
      ...state,
      classes: action.data,
      loadingClasses: false,
    };
  }),
  on(ClassActions.loadClasssFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingClasses: false,
    };
  }),
  on(ClassActions.createClass, (state) => {
    return {
      ...state,
      loadingClasses: true,
    };
  }),
  on(ClassActions.createClassSuccess, (state, action) => {
    return {
      ...state,
      classes: [...state.classes, action.data],
      loadingClasses: false,
    };
  }),
  on(ClassActions.createClassFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingClasses: false,
    };
  }),
  on(ClassActions.deleteClassByID, (state) => {
    return {
      ...state,
      loadingClasses: true,
    };
  }),
  on(ClassActions.deleteClassSuccess, (state, action) => ({
    ...state,
    loadingClasses: false,
    classes: state.classes.filter((el) => el.id !== action.data.id),
  })),
  on(ClassActions.deleteClassFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingClasses: false,
    };
  }),
  on(ClassActions.updateClass, (state) => ({
    ...state,
    loadingClasses: true,
    error: null,
  })),
  on(ClassActions.updateClassSuccess, (state, { data }) => ({
    ...state,
    loadingClasses: false,
    classes: state.classes.map((c) =>
      c.id === data.id ? { ...c, ...data } : c
    ),
  })),
  on(ClassActions.updateClassFailure, (state, { error }) => ({
    ...state,
    loadingClasses: false,
    error,
  }))
);

export const classFeature = createFeature({
  name: classFeatureKey,
  reducer,
});
