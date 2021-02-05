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
          map((data) => UsersActions.allDataLoaded({ data })),
          catchError((error) => of(UsersActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: UsersService) {}
}