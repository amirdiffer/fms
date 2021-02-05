import { CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY } from './role-permission/role-permission.entity';
import * as rolePermissionReducer from './role-permission/role-permission.reducer';
import * as usersReducer from './users/users.reducer';
import { CONFIGURATION_USERS_FEATURE_KEY } from './users/users.entity';

export const reducers = {
  [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: rolePermissionReducer.reducer,
  [CONFIGURATION_USERS_FEATURE_KEY]: usersReducer.reducer
};
