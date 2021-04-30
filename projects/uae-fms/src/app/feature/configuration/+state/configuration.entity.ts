import {
  CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY,
  RolePermissionState
} from './role-permission/role-permission.entity';
import {
  AssetPolicyState,
  CONFIGURATION_ASSET_POLICY_FEATURE_KEY
} from './asset-policy/asset/asset-policy.entity';
import {
  CONFIGURATION_USERS_FEATURE_KEY,
  UsersState
} from './users/users.entity';
import {
  BusinessCategoryState,
  CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY
} from './business-category/business-category.entity';

import {
  CONFIGURATION_FLEET_STATUS_ASSET_FEATURE_KEY,
  FleetStatusAssetState
} from './fleet-status/asset/fleet-status-asset.entity';
import {
  CONFIGURATION_OWNERSHIP_FEATURE_KEY,
  OwnershipState
} from './ownership/ownership.entity';
import {
  CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY,
  PeriodicServiceState
} from './periodic-service/periodic-service.entity';
import {
  CONFIGURATION_FLEET_STATUS_SUB_ASSET_FEATURE_KEY,
  FleetStatusSubAssetState
} from './fleet-status/sub-asset/fleet-status-sub-asset.entity';
import {
  CONFIGURATION_SUB_ASSET_POLICY_FEATURE_KEY,
  SubAssetPolicyState
} from './asset-policy/sub-asset/sub-asset-policy.entity';
import {
  AssetConfigurationState,
  CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY
} from './asset-configuration/asset-configuration.entity';
// import {
//   AssetTypeState,
//   CONFIGURATION_ASSET_TYPE_FEATURE_KEY
// } from './asset-configuration/asset-type/asset-type.entity';
import { 
  FLEET_CONFIGURATION_ASSET_TYPE_FEATURE_KEY,
  AssetTypeState 
} from './fleet-configuration/asset-type/asset-type.entity';

import { 
  AccessoryTypeState, 
  FLEET_CONFIGURATION_ACCESSORY_TYPE_FEATURE_KEY 
} from './fleet-configuration/accessory-type/accessory-type.entity';

import { 
  FLEET_CONFIGURATION_SUB_ASSET_TYPE_FEATURE_KEY, 
  SubAssetTypeState 
} from './fleet-configuration/sub-asset-type/sub-asset-type.entity';

export const CONFIGURATION_FEATURE_KEY = 'configuration';

export interface State {
  readonly [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: RolePermissionState;
  readonly [CONFIGURATION_ASSET_POLICY_FEATURE_KEY]: AssetPolicyState;
  readonly [CONFIGURATION_SUB_ASSET_POLICY_FEATURE_KEY]: SubAssetPolicyState;
  readonly [CONFIGURATION_USERS_FEATURE_KEY]: UsersState;
  readonly [CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY]: BusinessCategoryState;
  readonly [CONFIGURATION_FLEET_STATUS_ASSET_FEATURE_KEY]: FleetStatusAssetState;
  readonly [CONFIGURATION_FLEET_STATUS_SUB_ASSET_FEATURE_KEY]: FleetStatusSubAssetState;
  readonly [CONFIGURATION_OWNERSHIP_FEATURE_KEY]: OwnershipState;
  readonly [CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY]: PeriodicServiceState;
  readonly [CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY]: AssetConfigurationState;
  // readonly [CONFIGURATION_ASSET_TYPE_FEATURE_KEY]: AssetTypeState;
  readonly [FLEET_CONFIGURATION_ASSET_TYPE_FEATURE_KEY] : AssetTypeState;
  readonly [FLEET_CONFIGURATION_ACCESSORY_TYPE_FEATURE_KEY ] : AccessoryTypeState,
  readonly [FLEET_CONFIGURATION_SUB_ASSET_TYPE_FEATURE_KEY] : SubAssetTypeState
}

export interface ConfigurationPartialState {
  readonly [CONFIGURATION_FEATURE_KEY]: State;
}
