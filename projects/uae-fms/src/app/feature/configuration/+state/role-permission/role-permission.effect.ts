import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionActions } from './role-permission.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RolePermissionEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(RolePermissionActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) =>
            RolePermissionActions.allDataLoaded({ data: data.message.map(x => ({ ...x, id: x.roleId })) })
          ),
          catchError((error) =>
            of(RolePermissionActions.error({ reason: error }))
          )
        )
      )
    )
  );
  addRole$ = createEffect(() =>
    this.action$.pipe(
      ofType(RolePermissionActions.addRole),
      mergeMap((action) =>
        this.service.addNewRole(action.data).pipe(
          map((data) =>
          RolePermissionActions.roleAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(RolePermissionActions.error({ reason: error })))
        )
      )
    )
  );

  updateRole$ = createEffect(() =>
    this.action$.pipe(
      ofType(RolePermissionActions.updateRole),
      mergeMap((action) =>
        this.service.updateRole(action.data).pipe(
          map((data) =>
          RolePermissionActions.roleUpdateSuccessfully({ data: action.data })
          ),
          catchError((error) => of(RolePermissionActions.error({ reason: error })))
        )
      )
    )
  );

  getAssetByID = createEffect(() =>
    this.action$.pipe(
      ofType(RolePermissionActions.roleByRoleId),
      mergeMap((action) =>
        this.service.getRoleByRoleID(action.roleId).pipe(
          map((data) => {
            return RolePermissionActions.roleByRoleIdLoaded({ data: data.message });
          }),
          catchError((error) => of(RolePermissionActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: RolePermissionService
  ) { }
}
