import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserPorfileAction } from './user.action';
import { UserProfileService } from './user.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
@Injectable()
export class UserProfileEffect {
  constructor(private action$: Actions, private _service: UserProfileService) {}

  loadData$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserPorfileAction.loadData),
      mergeMap((action) =>
        this._service.loadProfile().pipe(
          map((data) => {
            return UserPorfileAction.dataLoaded({ data: data.message });
          }),
          catchError((error) => of(UserPorfileAction.error({ reason: error })))
        )
      )
    )
  );
}
