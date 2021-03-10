import { Action, createReducer, on } from '@ngrx/store';
import { FleetStatusAssetActions } from './fleet-status-asset.actions';
import {
  fleetStatusAssetAdapter,
  FleetStatusAssetState,
  initialState
} from './fleet-status-asset.entity';

const fleetStatusAssetReducer = createReducer(
  initialState,
  on(FleetStatusAssetActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(FleetStatusAssetActions.allDataLoaded, (state, { data }) =>
    fleetStatusAssetAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),
  on(FleetStatusAssetActions.addFleetStatus, (state, { data }) => ({
    ...state,
    loaded: false
  })),
  on(FleetStatusAssetActions.fleetStatusAddedSuccessfully, (state, { data }) =>
    fleetStatusAssetAdapter.addOne(data, state)
  ),
  on(FleetStatusAssetActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: FleetStatusAssetState, action: Action) {
  return fleetStatusAssetReducer(state, action);
}
