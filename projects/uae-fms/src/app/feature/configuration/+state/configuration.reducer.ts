import { CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY } from './role-permission/role-permission.entity';
import * as rolePermissionReducer from './role-permission/role-permission.reducer';
import * as assetPolicyReducer from './asset-policy/asset-policy.reducer';
import { CONFIGURATION_ASSET_POLICY_FEATURE_KEY } from './asset-policy/asset-policy.entity';

export const reducers = {
  [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: rolePermissionReducer.reducer,
  [CONFIGURATION_ASSET_POLICY_FEATURE_KEY]: assetPolicyReducer.reducer
};
