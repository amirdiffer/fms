import {
  CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY,
  RolePermissionState
} from './role-permission/role-permission.entity';
import {
  AssetPolicyState,
  CONFIGURATION_ASSET_POLICY_FEATURE_KEY
} from './asset-policy/asset-policy.entity';
import {
  CONFIGURATION_USERS_FEATURE_KEY,
  UsersState
} from './users/users.entity';
import {
  CONFIGURATION_FLEET_STATUS_FEATURE_KEY,
  FleetStatusState
} from './fleet-status/fleet-status.entity';
export const CONFIGURATION_FEATURE_KEY = 'configuration';

export interface State {
  readonly [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: RolePermissionState;
  readonly [CONFIGURATION_ASSET_POLICY_FEATURE_KEY]: AssetPolicyState;
  readonly [CONFIGURATION_USERS_FEATURE_KEY]: UsersState;
  readonly [CONFIGURATION_FLEET_STATUS_FEATURE_KEY]: FleetStatusState;
}

export interface ConfigurationPartialState {
  readonly [CONFIGURATION_FEATURE_KEY]: State;
}
