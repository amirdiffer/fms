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
            RolePermissionActions.allDataLoaded({
              data: data.message.map((x) => ({ ...x, id: x.roleId }))
            })
          ),
          catchError((error) =>
            of(RolePermissionActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: RolePermissionService
  ) {}
}
