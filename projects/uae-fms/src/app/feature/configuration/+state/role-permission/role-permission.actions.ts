import { createAction, props } from '@ngrx/store';
import { RolePermissionStateModel } from './role-permission.entity';

export class RolePermissionActions {
  static loadAll = createAction('[RolePermission] load all data');

  static allDataLoaded = createAction(
    '[RolePermission] all datas are loaded',
    props<{ data: RolePermissionStateModel[] }>()
  );

  static error = createAction(
    '[RolePermission] error occurred',
    props<{ reason: any }>()
  );
}
