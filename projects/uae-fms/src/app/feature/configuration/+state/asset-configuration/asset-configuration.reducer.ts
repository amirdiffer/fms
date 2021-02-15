import {
  assetConfigurationAdapter,
  AssetConfigurationState,
  initialState
} from './asset-configuration.entity';
import { AssetConfigurationActions } from './asset-configuration.actions';
import { Action, createReducer, on } from '@ngrx/store';

const assetConfigurationReducer = createReducer(
  initialState,
  on(AssetConfigurationActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(AssetConfigurationActions.allDataLoaded, (state, { data }) =>
    assetConfigurationAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),
  on(AssetConfigurationActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: AssetConfigurationState, action: Action) {
  return assetConfigurationReducer(state, action);
}
