import { createSelector } from '@ngrx/store';
import { rolePermissionAdapter } from './role-permission.entity';

const { selectAll } = rolePermissionAdapter.getSelectors();
const rolePermissionSelector = (state) => state['role-permission'];
export class RolePermissionSelectors {
  static selectAll = createSelector(
    rolePermissionSelector,
    selectAll
  );

  static message = createSelector(
    rolePermissionSelector,
    (state) => state.message
  );

  static error = createSelector(
    rolePermissionSelector,
    (state) => state.error
  );

  static loaded = createSelector(
    rolePermissionSelector,
    (state) => state.loaded
  );

  static submitted = createSelector(
    rolePermissionSelector,
    (state) => state.submitted
  );

  static specificRole= createSelector(
    rolePermissionSelector,
    (state) => state.role
  );
}
