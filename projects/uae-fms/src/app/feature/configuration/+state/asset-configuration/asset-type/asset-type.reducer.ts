import {
  assetTypeAdapter,
  AssetTypeState,
  initialState
} from './asset-type.entity';
import { AssetTypeActions } from './asset-type.actions';
import { Action, createReducer, on } from '@ngrx/store';

const assetTypeReducer = createReducer(
  initialState,
  on(AssetTypeActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(AssetTypeActions.allDataLoaded, (state, { data }) =>
    assetTypeAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),
  on(AssetTypeActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: AssetTypeState, action: Action) {
  return assetTypeReducer(state, action);
}
