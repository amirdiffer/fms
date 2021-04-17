import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { TableFacade } from '@core/table/+state/table.facade';
import { ServiceShopJobCardService } from './service-shop-job-card.service';
import { ServiceShopJobCardActions } from './service-shop-job-card.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class ServiceShopJobCardEffect {
  constructor(
    private action$: Actions,
    private service: ServiceShopJobCardService,
    private _tableFacade: TableFacade,
    private _store: Store
  ) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopJobCardActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'service-shop_jobcard');
            this._store.dispatch(ServiceShopJobCardActions.count({data:data.resultNumber}))
            return ServiceShopJobCardActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(ServiceShopJobCardActions.error({ reason: error }))
          )
        )
      )
    )
  );
  editJobCard$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopJobCardActions.editJobCard),
      mergeMap((action) =>
        this.service.editJobCard(action.jobCard).pipe(
          map((data) =>
          ServiceShopJobCardActions.jobCardEditedSuccessfully({
              jobCard: action.jobCard
            })
          ),
          catchError((error) =>
            of(ServiceShopJobCardActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopJobCardActions.addJobCard),
      mergeMap((action) =>
        this.service.post(action.data, action.assetId).pipe(
          map((data) =>
          ServiceShopJobCardActions.jobCardAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) =>
            of(ServiceShopJobCardActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
