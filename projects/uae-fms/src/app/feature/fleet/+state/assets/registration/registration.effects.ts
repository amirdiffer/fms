import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RegistrationActions } from '@feature/fleet/+state/assets/registration/registration.actions';
import { RegistrationService } from '@feature/fleet/+state/assets/registration/registration.service';

@Injectable()
export class RegistrationEffects {
  constructor(private action$: Actions, private service: RegistrationService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(RegistrationActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return RegistrationActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(RegistrationActions.error({ reason: error }))
          )
        )
      )
    )
  );
  register$ = createEffect(() =>
  this.action$.pipe(
    ofType(RegistrationActions.registerAsset),
    mergeMap((action) =>
      this.service.registerAsset(action.data).pipe(
        map((data) => RegistrationActions.assetRegisterSuccessfull({ data: action.data })),
        catchError((error) => of(RegistrationActions.error({ reason: error })))
      )
    )
  )
);
}
