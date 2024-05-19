import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromClass from './class.reducer';

export const selectClassState = createFeatureSelector<fromClass.State>(
  fromClass.classFeatureKey
);

export const selectClassList= createSelector(selectClassState, (c)=> c.classes)

export const selectLoadingClasses= createSelector(selectClassState, (c)=> c.loadingClasses)

export const selectClassesError = createSelector(
  selectClassState,
  (c) => c.error
);