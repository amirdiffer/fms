import { Action, createReducer, on } from '@ngrx/store';
import { FleetStatusSubAssetActions } from './fleet-status-sub-asset.actions';
import {
  fleetStatusSubAssetAdapter,
  FleetStatusSubAssetState,
  initialState
} from './fleet-status-sub-asset.entity';

const fleetStatusSubAssetReducer = createReducer(
  initialState,
  on(FleetStatusSubAssetActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(FleetStatusSubAssetActions.allDataLoaded, (state, { data }) =>
    fleetStatusSubAssetAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),
  on(FleetStatusSubAssetActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: FleetStatusSubAssetState, action: Action) {
  return fleetStatusSubAssetReducer(state, action);
}
