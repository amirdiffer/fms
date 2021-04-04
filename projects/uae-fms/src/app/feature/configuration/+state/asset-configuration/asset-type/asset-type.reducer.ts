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
  })),
  on(AssetTypeActions.addAssetType, (state, { data: any }) => ({
    ...state,
    submitted: false
  })),
  on(AssetTypeActions.assetTypeAddedSuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  })),
  on(AssetTypeActions.resetParams, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(AssetTypeActions.addMake, (state, { data: any }) => ({
    ...state,
    submitted: false
  })),
  on(AssetTypeActions.makeAddedSuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  })),
  on(AssetTypeActions.addModel, (state, { data: any }) => ({
    ...state,
    submitted: false
  })),
  on(AssetTypeActions.modelAddedSuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  })),
  on(AssetTypeActions.addTrim, (state, { data: any }) => ({
    ...state,
    submitted: false
  })),
  on(AssetTypeActions.trimAddedSuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  }))
);

export function reducer(state: AssetTypeState, action: Action) {
  return assetTypeReducer(state, action);
}
