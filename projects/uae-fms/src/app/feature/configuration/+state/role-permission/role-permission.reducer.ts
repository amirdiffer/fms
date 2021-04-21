import { Action, createReducer, on } from '@ngrx/store';
import { RolePermissionActions } from './role-permission.actions';
import {
  initialState,
  rolePermissionAdapter,
  RolePermissionState
} from './role-permission.entity';

const rolePermissionReducer = createReducer(
  initialState,
  on(RolePermissionActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(RolePermissionActions.allDataLoaded, (state, { data }) =>
    rolePermissionAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(RolePermissionActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(RolePermissionActions.addRole, (state, { data }) => ({
    ...state,
    submitted: false
  })),
  on(RolePermissionActions.roleAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),
  on(RolePermissionActions.updateRole, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(RolePermissionActions.roleUpdateSuccessfully, (state, { data }) =>
  rolePermissionAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),

  on(RolePermissionActions.roleByRoleId, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(RolePermissionActions.roleByRoleIdLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    role: data
  })),
);

export function reducer(state: RolePermissionState, action: Action) {
  return rolePermissionReducer(state, action);
}
