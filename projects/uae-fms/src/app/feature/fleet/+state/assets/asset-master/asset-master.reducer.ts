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
  on(AssetMasterActions.count, (state, { data }) => ({
    ...state,
    resultNumber:data
  })),

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
    submitted: false
  })),
  on(AssetMasterActions.assetAddedSuccessfully, (state, { data }) =>
    ({ ...state, submitted: true })
  ),
  on(AssetMasterActions.editAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(AssetMasterActions.assetEditedSuccessfully, (state, { data }) =>
    assetMasterAdapter.updateOne({ changes: data, id: data.id }, {
      ...state,
      error:null,
      message: null,
      submitted: true
    })
  ),

  
  /* Asset By Id */
  on(AssetMasterActions.assetById, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(AssetMasterActions.assetByIdLoaded, (state, { data }) =>
    ({ 
      ...state, 
      loaded: true, 
      error: null, 
      asset: data 
    })),

  
  on(AssetMasterActions.reset, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
);

export function reducer(state: IAssetMasterState, action: Action) {
  return assetMasterReducer(state, action);
}
