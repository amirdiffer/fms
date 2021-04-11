import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RolePermissionSelectors } from './role-permission.selectors';
import { RolePermissionPartialState } from './role-permission.entity';
import { RolePermissionActions } from './role-permission.actions';

@Injectable()
export class RolePermissionFacade {
  rolePermission$ = this.store.pipe(select(RolePermissionSelectors.selectAll));

  message$ = this.store.pipe(select(RolePermissionSelectors.message));

  error$ = this.store.pipe(select(RolePermissionSelectors.error));

  loaded$ = this.store.pipe(select(RolePermissionSelectors.loaded));

  constructor(private store: Store<RolePermissionPartialState>) { }

  loadAll() {
    this.store.dispatch(RolePermissionActions.loadAll());
  }
}
