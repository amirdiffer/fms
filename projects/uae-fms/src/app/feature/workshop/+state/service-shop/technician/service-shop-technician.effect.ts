import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TableFacade } from '@core/table/+state/table.facade';
import { ServiceShopTechnicianService } from './service-shop-technician.service';
import { ServiceShopTechnicianActions } from './service-shop-technician.actions';

@Injectable()
export class ServiceShopTechnicianEffect {
  constructor(
    private action$: Actions,
    private service: ServiceShopTechnicianService,
    private _tableFacade: TableFacade
  ) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopTechnicianActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'service-shop_technician');
            return ServiceShopTechnicianActions.allDataLoaded({
              data: data.message
            });
          }),
          catchError((error) =>
            of(ServiceShopTechnicianActions.error({ reason: error }))
          )
        )
      )
    )
  );
  editTechnician$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopTechnicianActions.editTechnician),
      mergeMap((action) =>
        this.service.editTechnician(action.technician).pipe(
          map((data) =>
          ServiceShopTechnicianActions.technicianEditedSuccessfully({
              technician: action.technician
            })
          ),
          catchError((error) =>
            of(ServiceShopTechnicianActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceShopTechnicianActions.addTechnician),
      mergeMap((action) =>
        this.service.post(action.data).pipe(
          map((data) =>
          ServiceShopTechnicianActions.technicianAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) =>
            of(ServiceShopTechnicianActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
