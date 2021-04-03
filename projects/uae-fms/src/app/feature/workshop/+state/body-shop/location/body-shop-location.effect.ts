import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BodyShopLocationActions } from './body-shop-location.actions';
import { BodyShopLocationService } from './body-shop-location.service';

@Injectable()
export class BodyShopLocationEffect {
  constructor(
    private action$: Actions,
    private service: BodyShopLocationService
  ) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopLocationActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return BodyShopLocationActions.allDataLoaded({
              data: data.message
            });
          }),
          catchError((error) =>
            of(BodyShopLocationActions.error({ reason: error }))
          )
        )
      )
    )
  );
  editBodyShopLocation$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopLocationActions.editBodyShopLocation),
      mergeMap((action) =>
        this.service.editLocation(action.bodyShopLocation).pipe(
          map((data) =>
            BodyShopLocationActions.bodyShopLocationEditedSuccessfully({
              bodyShopLocation: action.bodyShopLocation
            })
          ),
          catchError((error) =>
            of(BodyShopLocationActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopLocationActions.addBodyShopLocation),
      mergeMap((action) =>
        this.service.post(action.data).pipe(
          map((data) =>
            BodyShopLocationActions.bodyShopLocationAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) =>
            of(BodyShopLocationActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
