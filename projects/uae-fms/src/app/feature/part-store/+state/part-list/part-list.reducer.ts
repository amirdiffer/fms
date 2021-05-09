import { Action, createReducer, on } from '@ngrx/store';
import { PartListActions } from './part-list.actions';
import {
  initialState,
  partListAdapter,
  PartListState
} from './part-list.entity';
import { AssetMasterActions } from '@feature/fleet/+state/assets/asset-master/asset-master.actions';
import { IPartListStatistics } from '@models/statistics';

const partListReducer = createReducer(
  initialState,
  on(PartListActions.loadAllAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(PartListActions.allAssetDataLoaded, (state, { data }) =>
    partListAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),

  on(PartListActions.loadAllSubAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(PartListActions.assetStatisticsLoaded, (state, data) => ({
    ...state,
    assetStatistics: data.data
  })),

  on(PartListActions.subAssetStatisticsLoaded, (state, data) => ({
    ...state,
    subAssetStatistics: data.data
  })),

  on(PartListActions.allSubAssetDataLoaded, (state, { data }) =>
    partListAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(PartListActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: PartListState, action: Action) {
  return partListReducer(state, action);
}
