import { createAction, props } from '@ngrx/store';
import { IRole } from '@models/configuration';

export class RolePermissionActions {
  static loadAll = createAction('[RolePermission] load all data');

  static allDataLoaded = createAction(
    '[RolePermission] all datas are loaded',
    props<{ data: IRole[] }>()
  );

  static addRole = createAction(
    '[RolePermission] add new role',
    props<{ data: any }>()
  );
  
  static roleAddedSuccessfully = createAction(
    '[RolePermission] role added successfully',
    props<{ data: IRole }>()
  );

  static updateRole = createAction(
    '[RolePermission] update role',
    props<{ data: any }>()
  );

  static roleUpdateSuccessfully = createAction(
    '[RolePermission] role updated successfully',
    props<{ data: IRole }>()
  );

  static roleByRoleId = createAction(
    '[RolePermission] load role by roleId',
    props<{ roleId: number }>()
  );
  static roleByRoleIdLoaded = createAction(
    '[RolePermission] specific role loaded',
    props<{ data: IRole }>()
  );

  static error = createAction(
    '[RolePermission] error occurred',
    props<{ reason: any }>()
  );
}
