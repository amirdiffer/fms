import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY = 'role-permission';

export interface RolePermissionStateModel {
  name: string;
  view: string;
  edit: string;
  create: string;
}

export interface RolePermissionState
  extends EntityState<RolePermissionStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface RolePermissionPartialState {
  [CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY]: RolePermissionState;
}

export const rolePermissionAdapter: EntityAdapter<RolePermissionStateModel> = createEntityAdapter<
  RolePermissionStateModel
>();

export const initialState: RolePermissionState = rolePermissionAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as RolePermissionState
);
