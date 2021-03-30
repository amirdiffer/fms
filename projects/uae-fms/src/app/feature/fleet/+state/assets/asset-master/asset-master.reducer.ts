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
  on(AssetMasterActions.statisticsLoaded, (state, data) => ({
    ...state,
    statistics: data.data
  })),
  on(AssetMasterActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(AssetMasterActions.addAsset, (state, { data }) => ({
    ...state,
    loaded: false
  })),
  on(AssetMasterActions.assetAddedSuccessfully, (state, { data }) =>
    assetMasterAdapter.addOne(data, { ...state, submitted: true })
  ),
  on(AssetMasterActions.editAsset, (state, { data }) => ({
    ...state,
    loaded: false
  })),
  on(AssetMasterActions.assetEditedSuccessfully, (state, { data }) =>
    assetMasterAdapter.updateOne({ changes: data, id: data.id }, state)
  )
);

export function reducer(state: IAssetMasterState, action: Action) {
  return assetMasterReducer(state, action);
}
