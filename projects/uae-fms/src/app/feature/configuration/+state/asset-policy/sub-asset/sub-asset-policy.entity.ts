import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
export const CONFIGURATION_SUB_ASSET_POLICY_FEATURE_KEY = 'subAssetPolicy';
export interface SubAssetPolicyStateModel {
  policyName: string;
  distance: string;
  year: string;
  depreciationValue: string;
}

export interface SubAssetPolicyState
  extends EntityState<SubAssetPolicyStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface SubAssetPolicyPartialState {
  [CONFIGURATION_SUB_ASSET_POLICY_FEATURE_KEY]: SubAssetPolicyState;
}

export const subAssetPolicyAdapter: EntityAdapter<SubAssetPolicyStateModel> = createEntityAdapter<
  SubAssetPolicyStateModel
>();

export const initialState: SubAssetPolicyState = subAssetPolicyAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as SubAssetPolicyState
);
