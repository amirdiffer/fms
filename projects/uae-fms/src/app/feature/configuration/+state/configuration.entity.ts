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
  BusinessCategoryState,
  CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY
} from './business-category/business-category.entity';

import {
  CONFIGURATION_FLEET_STATUS_FEATURE_KEY,
  FleetStatusState
} from './fleet-status/fleet-status.entity';
import {
  CONFIGURATION_OWNERSHIP_FEATURE_KEY,
  OwnershipState
} from './ownership/ownership.entity';
import {
  CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY,
  PeriodicServiceState
} from './periodic-service/periodic-service.entity';
export const CONFIGURATION_FEATURE_KEY = 'configuration';

export interface State {
  readonly [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: RolePermissionState;
  readonly [CONFIGURATION_ASSET_POLICY_FEATURE_KEY]: AssetPolicyState;
  readonly [CONFIGURATION_USERS_FEATURE_KEY]: UsersState;
  readonly [CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY]: BusinessCategoryState;
  readonly [CONFIGURATION_FLEET_STATUS_FEATURE_KEY]: FleetStatusState;
  readonly [CONFIGURATION_OWNERSHIP_FEATURE_KEY]: OwnershipState;
  readonly [CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY]: PeriodicServiceState;
}

export interface ConfigurationPartialState {
  readonly [CONFIGURATION_FEATURE_KEY]: State;
}
