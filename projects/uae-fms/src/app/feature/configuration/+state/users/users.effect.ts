import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from './users.service';
import { UsersActions } from './users.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => UsersActions.allDataLoaded({ data: data.message })),
          catchError((error) => of(UsersActions.error({ reason: error })))
        )
      )
    )
  );
  loadStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.loadStatistics),
      mergeMap((action) =>
        this.service.loadAllStatistics().pipe(
          map((data) => UsersActions.statisticsLoaded({ data: data.message })),
          catchError((error) => of(UsersActions.error({ reason: error })))
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.editUser),
      mergeMap((action) =>
        this.service.editUser(action.user).pipe(
          map((data) => UsersActions.userEditedSuccessfully({ user: action.user })),
          catchError((error) => of(UsersActions.error({ reason: error })))
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.addUser),
      mergeMap((action) =>
        this.service.post(action.data).pipe(
          map((data) =>
            UsersActions.userAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(UsersActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: UsersService) { }
}
