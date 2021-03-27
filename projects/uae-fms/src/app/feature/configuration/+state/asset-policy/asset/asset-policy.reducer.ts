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
  on(AssetPolicyActions.addAssetPolicy, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null,
    submitted: false
  })),
  on(AssetPolicyActions.addAssetPolicySuccessfully, (state, { data }) =>
    assetPolicyAdapter.addOne(data, state)
  ),
  on(AssetPolicyActions.editAssetPolicy, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(AssetPolicyActions.editAssetPolicySuccessfully, (state, { data }) =>
    assetPolicyAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  )
);

export function reducer(state: AssetPolicyState, action: Action) {
  return assetPolicyReducer(state, action);
}
