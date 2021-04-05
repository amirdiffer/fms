import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BodyShopJobCardActions } from './body-shop-job-card.actions';
import { BodyShopJobCardService } from './body-shop-job-card.service';

@Injectable()
export class BodyShopJobCardEffect {
  constructor(
    private action$: Actions,
    private service: BodyShopJobCardService
  ) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopJobCardActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return BodyShopJobCardActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(BodyShopJobCardActions.error({ reason: error }))
          )
        )
      )
    )
  );
  editJobCard$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopJobCardActions.editJobCard),
      mergeMap((action) =>
        this.service.editJobCard(action.jobCard).pipe(
          map((data) =>
            BodyShopJobCardActions.jobCardEditedSuccessfully({
              jobCard: action.jobCard
            })
          ),
          catchError((error) =>
            of(BodyShopJobCardActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopJobCardActions.addJobCard),
      mergeMap((action) =>
        this.service.post(action.data, action.assetId).pipe(
          map((data) =>
            BodyShopJobCardActions.jobCardAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) =>
            of(BodyShopJobCardActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
