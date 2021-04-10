import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IAssetPolicy } from '@models/asset-policy.model';

export const CONFIGURATION_ASSET_POLICY_FEATURE_KEY = 'assetPolicy';

export interface AssetPolicyState extends EntityState<IAssetPolicy> {
  submitted?: boolean;
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface AssetPolicyPartialState {
  [CONFIGURATION_ASSET_POLICY_FEATURE_KEY]: AssetPolicyState;
}

export const assetPolicyAdapter: EntityAdapter<IAssetPolicy> = createEntityAdapter<
  IAssetPolicy>();

export const initialState: AssetPolicyState = assetPolicyAdapter.getInitialState(
  {
    submitted: false,
    error: null,
    loaded: null,
    message: null
  } as AssetPolicyState
);
