import {
  CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY,
  RolePermissionState
} from './role-permission/role-permission.entity';
import {
  AssetPolicyState,
  CONFIGURATION_ASSET_POLICY_FEATURE_KEY
} from './asset-policy/asset-policy.entity';

export const CONFIGURATION_FEATURE_KEY = 'configuration';

export interface State {
  readonly [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: RolePermissionState;
  readonly [CONFIGURATION_ASSET_POLICY_FEATURE_KEY]: AssetPolicyState;
}

export interface WorkshopPartialState {
  readonly [CONFIGURATION_FEATURE_KEY]: State;
}
