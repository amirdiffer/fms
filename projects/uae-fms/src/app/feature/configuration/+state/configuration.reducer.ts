import * as assetPolicyReducer from './asset-policy/asset-policy.reducer';
import * as rolePermissionReducer from './role-permission/role-permission.reducer';
import { CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY } from './role-permission/role-permission.entity';
import { CONFIGURATION_ASSET_POLICY_FEATURE_KEY } from './asset-policy/asset-policy.entity';
import { CONFIGURATION_USERS_FEATURE_KEY } from './users/users.entity';
import * as usersReducer from './users/users.reducer';

export const reducers = {
  [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: rolePermissionReducer.reducer,
  [CONFIGURATION_ASSET_POLICY_FEATURE_KEY]: assetPolicyReducer.reducer,
  [CONFIGURATION_USERS_FEATURE_KEY]: usersReducer.reducer
};
