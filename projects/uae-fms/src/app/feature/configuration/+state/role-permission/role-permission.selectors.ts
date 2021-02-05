import { createSelector } from '@ngrx/store';
import { rolePermissionAdapter } from './role-permission.entity';
import { ConfigurationSelectors } from './../configuration.selectors';

export class RolePermissionSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.rolePermissionSelector,
    rolePermissionAdapter.setAll
  );

  static message = createSelector(
    ConfigurationSelectors.rolePermissionSelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.rolePermissionSelector,
    (state) => state.error
  );
}