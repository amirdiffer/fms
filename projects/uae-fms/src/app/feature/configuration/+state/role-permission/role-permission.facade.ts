import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RolePermissionSelectors } from './role-permission.selectors';
import { RolePermissionPartialState } from './role-permission.entity';
import { RolePermissionActions } from './role-permission.actions';

@Injectable()
export class RolePermissionFacade {
  rolePermission$ = this.store.pipe(select(RolePermissionSelectors.selectAll));

  specificRole$ = this.store.pipe(select(RolePermissionSelectors.specificRole));

  message$ = this.store.pipe(select(RolePermissionSelectors.message));

  error$ = this.store.pipe(select(RolePermissionSelectors.error));

  loaded$ = this.store.pipe(select(RolePermissionSelectors.loaded));

  submitted$ = this.store.pipe(select(RolePermissionSelectors.submitted));

  constructor(private store: Store<RolePermissionPartialState>) { }

  loadAll() {
    this.store.dispatch(RolePermissionActions.loadAll());
  }

  addNewRoll(data: any) {
    this.store.dispatch(RolePermissionActions.addRole({ data }));
  }
  updateRole(data: any) {
    this.store.dispatch(RolePermissionActions.updateRole({ data }));
  }

  getRoleByRoleID(roleId: number) {
    this.store.dispatch(RolePermissionActions.roleByRoleId({ roleId }));
  }
}
