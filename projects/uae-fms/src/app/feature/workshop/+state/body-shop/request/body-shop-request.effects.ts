import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BodyShopRequestActions } from './body-shop-request.actions';
import { BodyShopRequestService } from './body-shop-request.service';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class BodyShopRequestEffect {
  constructor(
    private action$: Actions,
    private service: BodyShopRequestService,
    private _tableFacade: TableFacade
  ) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopRequestActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'body-shop_request');
            return BodyShopRequestActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(BodyShopRequestActions.error({ reason: error }))
          )
        )
      )
    )
  );
  loadAllRequestsById = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopRequestActions.loadAllRequestsById),
      mergeMap((action) =>
        this.service.requestsById(action.id).pipe(
          map((data) => {
            return BodyShopRequestActions.requestsByIdDataLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(BodyShopRequestActions.error({ reason: error }))
          )
        )
      )
    )
  );
  loadStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopRequestActions.loadStatistics),
      mergeMap((action) =>
        this.service.loadStatistics().pipe(
          map((data) => {
            return BodyShopRequestActions.allStatisticsLoaded({ data });
          }),
          catchError((error) =>
            of(BodyShopRequestActions.error({ reason: error }))
          )
        )
      )
    )
  );

  editRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopRequestActions.editRequest),
      mergeMap((action) =>
        this.service.editRequest(action.request).pipe(
          map((data) =>
            BodyShopRequestActions.requestEditedSuccessfully({
              request: action.request
            })
          ),
          catchError((error) =>
            of(BodyShopRequestActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopRequestActions.addRequest),
      mergeMap((action) =>
        this.service.post(action.data).pipe(
          map((data) =>
            BodyShopRequestActions.requestAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) =>
            of(BodyShopRequestActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
