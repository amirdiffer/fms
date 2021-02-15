import * as assetPolicyReducer from './asset-policy/asset-policy.reducer';
import * as rolePermissionReducer from './role-permission/role-permission.reducer';
import { CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY } from './role-permission/role-permission.entity';
import { CONFIGURATION_ASSET_POLICY_FEATURE_KEY } from './asset-policy/asset-policy.entity';
import { CONFIGURATION_USERS_FEATURE_KEY } from './users/users.entity';
import * as usersReducer from './users/users.reducer';
import * as businessCategoryReducer from './business-category/business-category.reducer';
import { CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY } from './business-category/business-category.entity';
import * as fleetStatusReducer from './fleet-status/fleet-status.reducer';
import { CONFIGURATION_FLEET_STATUS_FEATURE_KEY } from './fleet-status/fleet-status.entity';
import { CONFIGURATION_OWNERSHIP_FEATURE_KEY } from './ownership/ownership.entity';
import * as ownershipReducer from './ownership/ownership.reducer';
import { CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY } from './periodic-service/periodic-service.entity';
import * as periodicServiceReducer from './periodic-service/periodic-service.reducer';
import { CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY } from './asset-configuration/asset-configuration.entity';
import * as assetConfigurationReducer from './asset-configuration/asset-configuration.reducer';

export const reducers = {
  [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: rolePermissionReducer.reducer,
  [CONFIGURATION_ASSET_POLICY_FEATURE_KEY]: assetPolicyReducer.reducer,
  [CONFIGURATION_USERS_FEATURE_KEY]: usersReducer.reducer,
  [CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY]:
    businessCategoryReducer.reducer,
  [CONFIGURATION_FLEET_STATUS_FEATURE_KEY]: fleetStatusReducer.reducer,
  [CONFIGURATION_OWNERSHIP_FEATURE_KEY]: ownershipReducer.reducer,
  [CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY]: periodicServiceReducer.reducer,
  [CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY]:
    assetConfigurationReducer.reducer
};
