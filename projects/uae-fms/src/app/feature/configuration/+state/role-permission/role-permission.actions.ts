import { createAction, props } from '@ngrx/store';
import { IRole } from '@models/configuration';

export class RolePermissionActions {
  static loadAll = createAction('[RolePermission] load all data');

  static allDataLoaded = createAction(
    '[RolePermission] all datas are loaded',
    props<{ data: IRole[] }>()
  );

  static error = createAction(
    '[RolePermission] error occurred',
    props<{ reason: any }>()
  );
}
