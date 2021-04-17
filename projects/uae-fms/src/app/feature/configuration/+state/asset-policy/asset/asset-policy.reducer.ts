import { Action, createReducer, on } from '@ngrx/store';
import { AssetPolicyActions } from './asset-policy.actions';
import {
  assetPolicyAdapter,
  AssetPolicyState,
  initialState
} from './asset-policy.entity';

const assetPolicyReducer = createReducer(
  initialState,
  on(AssetPolicyActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(AssetPolicyActions.allDataLoaded, (state, { data }) =>
    assetPolicyAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),

  on(AssetPolicyActions.count, (state, { data }) => ({
    ...state,
    resultNumber:data
  })),

  on(AssetPolicyActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(AssetPolicyActions.addAssetPolicy, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null,
    submitted: false
  })),
  on(AssetPolicyActions.addAssetPolicySuccessfully, (state, { data }) =>
    assetPolicyAdapter.addOne(data, { ...state, submitted: true })
  ),
  on(AssetPolicyActions.editAssetPolicy, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(AssetPolicyActions.editAssetPolicySuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  })
  ),
  on(AssetPolicyActions.reset, (state) => ({ ...state, error: null, submitted: false, message: null }))
);

export function reducer(state: AssetPolicyState, action: Action) {
  return assetPolicyReducer(state, action);
}
