import { Action, createReducer, on } from '@ngrx/store';
import {
  initialState,
  periodicServiceAdapter,
  PeriodicServiceState
} from './periodic-service.entity';
import { PeriodicServiceActions } from './periodic-service.actions';

const periodicServiceReducer = createReducer(
  initialState,
  on(PeriodicServiceActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(PeriodicServiceActions.allDataLoaded, (state, { data }) =>
    periodicServiceAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(PeriodicServiceActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: PeriodicServiceState, action: Action) {
  return periodicServiceReducer(state, action);
}
