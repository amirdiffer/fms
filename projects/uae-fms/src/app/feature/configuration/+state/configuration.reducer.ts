import * as assetPolicyReducer from './asset-policy/asset/asset-policy.reducer';
import * as subAssetPolicyReducer from './asset-policy/sub-asset/sub-asset-policy.reducer';
import * as rolePermissionReducer from './role-permission/role-permission.reducer';
import * as usersReducer from './users/users.reducer';
import * as fleetStatusAssetReducer from './fleet-status/asset/fleet-status-asset.reducer';
import * as fleetStatusSubAssetReducer from './fleet-status/sub-asset/fleet-status-sub-asset.reducer';
import * as businessCategoryReducer from './business-category/business-category.reducer';
import * as ownershipReducer from './ownership/ownership.reducer';
import * as periodicServiceReducer from './periodic-service/periodic-service.reducer';
import * as assetConfigurationReducer from './asset-configuration/asset-configuration.reducer';
import * as assetTypeReducer from './fleet-configuration/asset-type/asset-type.reducer';
import * as accessoryReducer from './fleet-configuration/accessory-type/accessory-type.reducer'
import * as subAssetTypeReducer from './fleet-configuration/sub-asset-type/sub-asset-type.reducer'

import { CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY } from './role-permission/role-permission.entity';
import { CONFIGURATION_ASSET_POLICY_FEATURE_KEY } from './asset-policy/asset/asset-policy.entity';
import { CONFIGURATION_USERS_FEATURE_KEY } from './users/users.entity';
import { CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY } from './business-category/business-category.entity';
import { CONFIGURATION_FLEET_STATUS_ASSET_FEATURE_KEY } from './fleet-status/asset/fleet-status-asset.entity';
import { CONFIGURATION_OWNERSHIP_FEATURE_KEY } from './ownership/ownership.entity';
import { CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY } from './periodic-service/periodic-service.entity';
import { CONFIGURATION_FLEET_STATUS_SUB_ASSET_FEATURE_KEY } from './fleet-status/sub-asset/fleet-status-sub-asset.entity';
import { CONFIGURATION_SUB_ASSET_POLICY_FEATURE_KEY } from './asset-policy/sub-asset/sub-asset-policy.entity';
import { CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY } from './asset-configuration/asset-configuration.entity';
// import { CONFIGURATION_ASSET_TYPE_FEATURE_KEY } from './asset-configuration/asset-type/asset-type.entity';
// import * as assetTypeReducer from './asset-configuration/asset-type/asset-type.reducer';

import {FLEET_CONFIGURATION_ASSET_TYPE_FEATURE_KEY} from './fleet-configuration/asset-type/asset-type.entity';
import { FLEET_CONFIGURATION_ACCESSORY_TYPE_FEATURE_KEY } from './fleet-configuration/accessory-type/accessory-type.entity';
import {FLEET_CONFIGURATION_SUB_ASSET_TYPE_FEATURE_KEY} from './fleet-configuration/sub-asset-type/sub-asset-type.entity'


export const reducers = {
  [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: rolePermissionReducer.reducer,
  [CONFIGURATION_ASSET_POLICY_FEATURE_KEY]: assetPolicyReducer.reducer,
  [CONFIGURATION_SUB_ASSET_POLICY_FEATURE_KEY]: subAssetPolicyReducer.reducer,
  [CONFIGURATION_USERS_FEATURE_KEY]: usersReducer.reducer,
  [CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY]: businessCategoryReducer.reducer,
  [CONFIGURATION_FLEET_STATUS_ASSET_FEATURE_KEY]: fleetStatusAssetReducer.reducer,
  [CONFIGURATION_FLEET_STATUS_SUB_ASSET_FEATURE_KEY]: fleetStatusSubAssetReducer.reducer,
  [CONFIGURATION_OWNERSHIP_FEATURE_KEY]: ownershipReducer.reducer,
  [CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY]: periodicServiceReducer.reducer,
  [CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY]: assetConfigurationReducer.reducer,
  [FLEET_CONFIGURATION_ASSET_TYPE_FEATURE_KEY]: assetTypeReducer.reducer,
  [FLEET_CONFIGURATION_ACCESSORY_TYPE_FEATURE_KEY] : accessoryReducer.reducer,
  [FLEET_CONFIGURATION_SUB_ASSET_TYPE_FEATURE_KEY] : subAssetTypeReducer.reducer

};
