import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_ASSET_POLICY_FEATURE_KEY = 'asset-policy';

export interface AssetPolicyStateModel {
  policyName: string;
  distance: string;
  year: string;
  depreciationValue: string;
}

export interface AssetPolicyState extends EntityState<AssetPolicyStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface AssetPolicyPartialState {
  [CONFIGURATION_ASSET_POLICY_FEATURE_KEY]: AssetPolicyState;
}

export const assetPolicyAdapter: EntityAdapter<AssetPolicyStateModel> = createEntityAdapter<
  AssetPolicyStateModel
>();

export const initialState: AssetPolicyState = assetPolicyAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as AssetPolicyState
);
