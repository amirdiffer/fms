import { Action, createReducer, on } from '@ngrx/store';
import {
  assetMasterAdapter,
  IAssetMasterState,
  initialState
} from './asset-master.entity';
import { AssetMasterActions } from './asset-master.actions';

const assetMasterReducer = createReducer(
  initialState,
  on(AssetMasterActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(AssetMasterActions.allDataLoaded, (state, { data }) =>
    assetMasterAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),

  on(AssetMasterActions.loadStatistics, (state) => ({
    ...state,
    statistics: null,
    loaded: false
  })),

  on(AssetMasterActions.statisticsLoaded, (state, { data }) =>
    assetMasterAdapter.setOne(data, {
      ...state,
      statistics: data,
      loaded: true
    })
  ),

  on(AssetMasterActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: IAssetMasterState, action: Action) {
  return assetMasterReducer(state, action);
}
