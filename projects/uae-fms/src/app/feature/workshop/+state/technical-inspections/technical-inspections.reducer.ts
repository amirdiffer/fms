import { createReducer, on, Action } from '@ngrx/store';
import { TechnicalInspectionActions } from './technical-inspections.actions';
import {
  initialState,
  technicalInspectionAdapter,
  ITechnicalInspectionState
} from './technical-inspections.entity';

const technicalInspectionReducer = createReducer(
  initialState,
  on(TechnicalInspectionActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(TechnicalInspectionActions.allDataLoaded, (state, { data }) =>
    technicalInspectionAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),
  on(TechnicalInspectionActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: ITechnicalInspectionState, action: Action) {
  return technicalInspectionReducer(state, action);
}
