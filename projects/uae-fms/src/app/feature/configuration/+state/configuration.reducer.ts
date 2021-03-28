import * as assetPolicyReducer from './asset-policy/asset/asset-policy.reducer';
import * as subAssetPolicyReducer from './asset-policy/sub-asset/sub-asset-policy.reducer';
import * as rolePermissionReducer from './role-permission/role-permission.reducer';
import { CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY } from './role-permission/role-permission.entity';
import { CONFIGURATION_ASSET_POLICY_FEATURE_KEY } from './asset-policy/asset/asset-policy.entity';
import { CONFIGURATION_USERS_FEATURE_KEY } from './users/users.entity';
import * as usersReducer from './users/users.reducer';
import { CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY } from './business-category/business-category.entity';
import * as fleetStatusAssetReducer from './fleet-status/asset/fleet-status-asset.reducer';
import * as fleetStatusSubAssetReducer from './fleet-status/sub-asset/fleet-status-sub-asset.reducer';
import { CONFIGURATION_FLEET_STATUS_ASSET_FEATURE_KEY } from './fleet-status/asset/fleet-status-asset.entity';
import * as businessCategoryReducer from './business-category/business-category.reducer';
import { CONFIGURATION_OWNERSHIP_FEATURE_KEY } from './ownership/ownership.entity';
import * as ownershipReducer from './ownership/ownership.reducer';
import { CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY } from './periodic-service/periodic-service.entity';
import * as periodicServiceReducer from './periodic-service/periodic-service.reducer';
import { CONFIGURATION_FLEET_STATUS_SUB_ASSET_FEATURE_KEY } from './fleet-status/sub-asset/fleet-status-sub-asset.entity';
import { CONFIGURATION_SUB_ASSET_POLICY_FEATURE_KEY } from './asset-policy/sub-asset/sub-asset-policy.entity';
import { CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY } from './asset-configuration/asset-configuration.entity';
import * as assetConfigurationReducer from './asset-configuration/asset-configuration.reducer';

export const reducers = {
  [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: rolePermissionReducer.reducer,
  [CONFIGURATION_ASSET_POLICY_FEATURE_KEY]: assetPolicyReducer.reducer,
  [CONFIGURATION_SUB_ASSET_POLICY_FEATURE_KEY]: subAssetPolicyReducer.reducer,
  [CONFIGURATION_USERS_FEATURE_KEY]: usersReducer.reducer,
  [CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY]:
    businessCategoryReducer.reducer,
  [CONFIGURATION_FLEET_STATUS_ASSET_FEATURE_KEY]:
    fleetStatusAssetReducer.reducer,
  [CONFIGURATION_FLEET_STATUS_SUB_ASSET_FEATURE_KEY]:
    fleetStatusSubAssetReducer.reducer,
  [CONFIGURATION_OWNERSHIP_FEATURE_KEY]: ownershipReducer.reducer,
  [CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY]: periodicServiceReducer.reducer,
  [CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY]:
    assetConfigurationReducer.reducer
};
