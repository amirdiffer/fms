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
  }))
);

export function reducer(state: RolePermissionState, action: Action) {
  return rolePermissionReducer(state, action);
}
