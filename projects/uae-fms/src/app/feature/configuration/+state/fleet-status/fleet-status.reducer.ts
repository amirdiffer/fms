import { Action, createReducer, on } from '@ngrx/store';
import { FleetStatusActions } from './fleet-status.actions';
import {
  fleetStatusAdapter,
  FleetStatusState,
  initialState
} from './fleet-status.entity';

const fleetStatusReducer = createReducer(
  initialState,
  on(FleetStatusActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(FleetStatusActions.allDataLoaded, (state, { data }) =>
    fleetStatusAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(FleetStatusActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: FleetStatusState, action: Action) {
  return fleetStatusReducer(state, action);
}
