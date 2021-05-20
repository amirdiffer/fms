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
    message: null,
    submitted: false
  })),
  on(PeriodicServiceActions.allDataLoaded, (state, { data }) =>
    periodicServiceAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(PeriodicServiceActions.addPeriodicService, (state, { data }) => ({
    ...state,
    submitted: false
  })),
  on(
    PeriodicServiceActions.periodicServiceAddedSuccessfully,
    (state, { data }) => ({ ...state, submitted: true })
  ),
  on(PeriodicServiceActions.editPeriodicService, (state, { data }) => ({
    ...state,
    submitted: false
  })),
  on(
    PeriodicServiceActions.periodicServiceEditedSuccessfully,
    (state, { data }) => ({ ...state, submitted: true })
  ),

  on(PeriodicServiceActions.getPeriodicServiceById, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  
  on(PeriodicServiceActions.periodicServiceByIdLoaded, (state, { data }) => ({
      ...state,
      loaded: true,
      error: null,
      specificPeriodicService: data
  })),


  on(PeriodicServiceActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  on(PeriodicServiceActions.reset, (state) => ({
    ...state,
    submitted: false,
    error: null,
    message: null
  }))
);

export function reducer(state: PeriodicServiceState, action: Action) {
  return periodicServiceReducer(state, action);
}
