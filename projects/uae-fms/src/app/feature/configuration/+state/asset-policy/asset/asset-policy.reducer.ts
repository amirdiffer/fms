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

  on(AssetPolicyActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(AssetPolicyActions.addAssetPolicy,(state) =>({
    ...state,
    loaded:false
  })),
  on(AssetPolicyActions.addAssetPolicySuccessfully,(state , {data}) =>
    assetPolicyAdapter.addOne(data,state)
  )
);

export function reducer(state: AssetPolicyState, action: Action) {
  return assetPolicyReducer(state, action);
}
