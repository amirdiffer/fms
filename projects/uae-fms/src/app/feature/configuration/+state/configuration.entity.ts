import {
  CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY,
  RolePermissionState
} from './role-permission/role-permission.entity';
import {
  CONFIGURATION_USERS_FEATURE_KEY,
  UsersState
} from './users/users.entity';

export const CONFIGURATION_FEATURE_KEY = 'configuration';

export interface State {
  readonly [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: RolePermissionState;
  readonly [CONFIGURATION_USERS_FEATURE_KEY]: UsersState;
}

export interface ConfigurationPartialState {
  readonly [CONFIGURATION_FEATURE_KEY]: State;
}
