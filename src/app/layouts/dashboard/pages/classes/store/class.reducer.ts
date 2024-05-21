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
      loadingClasses: false,
    };
  }),
  on(ClassActions.createClassSuccess, (state, action) => {
    return {
      ...state,
      classes: [...state.classes, action.data], // Agrega la nueva clase al estado existente
      loadingClasses: false,
    };
  }),
  on(ClassActions.createClassFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingClasses: true,
    };
  })
);

export const classFeature = createFeature({
  name: classFeatureKey,
  reducer,
});
