import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IRole } from '@models/configuration';

export const CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY = 'role-permission';

export interface RolePermissionState
  extends EntityState<IRole> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface RolePermissionPartialState {
  [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: RolePermissionState;
}

export const rolePermissionAdapter: EntityAdapter<IRole> = createEntityAdapter<
  IRole
>();

export const initialState: RolePermissionState = rolePermissionAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as RolePermissionState
);
