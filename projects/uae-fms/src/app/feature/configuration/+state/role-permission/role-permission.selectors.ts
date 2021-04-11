import { createSelector } from '@ngrx/store';
import { rolePermissionAdapter } from './role-permission.entity';
import { ConfigurationSelectors } from './../configuration.selectors';
const { selectAll } = rolePermissionAdapter.getSelectors();

export class RolePermissionSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.rolePermissionSelector,
    selectAll
  );

  static message = createSelector(
    ConfigurationSelectors.rolePermissionSelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.rolePermissionSelector,
    (state) => state.error
  );

  static loaded = createSelector(
    ConfigurationSelectors.rolePermissionSelector,
    (state) => state.loaded
  );
}
