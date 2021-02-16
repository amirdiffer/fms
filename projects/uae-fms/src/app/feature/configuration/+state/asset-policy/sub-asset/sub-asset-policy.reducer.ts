import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { SubAssetPolicyActions } from './sub-asset-policy.actions';
import {
  initialState,
  subAssetPolicyAdapter,
  SubAssetPolicyState
} from './sub-asset-policy.entity';

const subAssetPolicyReducer = createReducer(
  initialState,
  on(SubAssetPolicyActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(SubAssetPolicyActions.allDataLoaded, (state, { data }) =>
    subAssetPolicyAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(SubAssetPolicyActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: SubAssetPolicyState, action: Action) {
  return subAssetPolicyReducer(state, action);
}
