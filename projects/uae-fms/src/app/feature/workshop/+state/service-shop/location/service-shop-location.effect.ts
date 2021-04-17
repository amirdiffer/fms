import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TableFacade } from '@core/table/+state/table.facade';
import { ServiceShopLocationService } from './service-shop-location.service';
import { ServiceShopLocationActions } from './service-shop-location.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class ServiceShopLocationEffect {
  constructor(
    private action$: Actions,
    private service: ServiceShopLocationService,
    private _tableFacade: TableFacade,
    private _store: Store
  ) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopLocationActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'service-shop_location');
            this._store.dispatch(ServiceShopLocationActions.count({data:data.resultNumber}))
            return ServiceShopLocationActions.allDataLoaded({
              data: data.message
            });
          }),
          catchError((error) =>
            of(ServiceShopLocationActions.error({ reason: error }))
          )
        )
      )
    )
  );
  editServiceShopLocation$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopLocationActions.editServiceShopLocation),
      mergeMap((action) =>
        this.service.editLocation(action.serviceShopLocation).pipe(
          map((data) =>
          ServiceShopLocationActions.serviceShopLocationEditedSuccessfully({
              serviceShopLocation: action.serviceShopLocation
            })
          ),
          catchError((error) =>
            of(ServiceShopLocationActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopLocationActions.addServiceShopLocation),
      mergeMap((action) =>
        this.service.post(action.data).pipe(
          map((data) =>
          ServiceShopLocationActions.serviceshopLocationAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) =>
            of(ServiceShopLocationActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
