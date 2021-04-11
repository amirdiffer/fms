import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IAssetPolicy } from '@models/asset-policy.model';
export const CONFIGURATION_SUB_ASSET_POLICY_FEATURE_KEY = 'subAssetPolicy';


export interface SubAssetPolicyState
  extends EntityState<IAssetPolicy> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface SubAssetPolicyPartialState {
  [CONFIGURATION_SUB_ASSET_POLICY_FEATURE_KEY]: SubAssetPolicyState;
}

export const subAssetPolicyAdapter: EntityAdapter<IAssetPolicy> = createEntityAdapter<
  IAssetPolicy
>();

export const initialState: SubAssetPolicyState = subAssetPolicyAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as SubAssetPolicyState
);
