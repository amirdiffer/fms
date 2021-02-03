import { CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY } from './role-permission/role-permission.entity';
import * as rolePermissionReducer from './role-permission/role-permission.reducer';

export const reducers = {
  [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: rolePermissionReducer.reducer
};
