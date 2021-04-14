import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { TableFacade } from '@core/table/+state/table.facade';
import { ServiceShopRequestService } from './service-shop-request.service';
import { ServiceShopRequestActions } from './service-shop-request.actions';

@Injectable()
export class ServiceShopRequestEffect {
  constructor(
    private action$: Actions,
    private service: ServiceShopRequestService,
    private _tableFacade: TableFacade
  ) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopRequestActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            let newData = data.message.map(
              ((x)=>{
                return {
                  ...x,
                  id:x.assetId
                }
              })
            )
            this._tableFacade.initialPaginator(data.resultNumber, 'body-shop_request');
            return ServiceShopRequestActions.allDataLoaded({ data: newData });
          }),
          catchError((error) =>
            of(ServiceShopRequestActions.error({ reason: error }))
          )
        )
      )
    )
  );
  loadAllRequestsById = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopRequestActions.loadAllRequestsById),
      mergeMap((action) =>
        this.service.requestsById(action.id).pipe(
          map((data) => {
            return ServiceShopRequestActions.requestsByIdDataLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(ServiceShopRequestActions.error({ reason: error }))
          )
        )
      )
    )
  );
  loadAllRequestsByassetId = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopRequestActions.loadAllRequestByAssetId),
      mergeMap((action) =>
        this.service.getRequestListByAssetId(action.assetId).pipe(
          map((data) => {
            return ServiceShopRequestActions.allRequestByAssetIdLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(ServiceShopRequestActions.error({ reason: error }))
          )
        )
      )
    )
  );
  loadStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopRequestActions.loadStatistics),
      mergeMap((action) =>
        this.service.loadStatistics().pipe(
          map((data) => {
            return ServiceShopRequestActions.allStatisticsLoaded({ data });
          }),
          catchError((error) =>
            of(ServiceShopRequestActions.error({ reason: error }))
          )
        )
      )
    )
  );

  editRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopRequestActions.editRequest),
      mergeMap((action) =>
        this.service.editRequest(action.request).pipe(
          map((data) =>
          ServiceShopRequestActions.requestEditedSuccessfully({
              request: action.request
            })
          ),
          catchError((error) =>
            of(ServiceShopRequestActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopRequestActions.addRequest),
      mergeMap((action) =>
        this.service.post(action.data).pipe(
          map((data) =>
          ServiceShopRequestActions.requestAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) =>
            of(ServiceShopRequestActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
