import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FleetStatusAssetActions } from './fleet-status-asset.actions';
import { FleetStatusAssetService } from './fleet-status-asset.service';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class FleetStatusAssetEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(FleetStatusAssetActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'fleet-status');
            return FleetStatusAssetActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(FleetStatusAssetActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(FleetStatusAssetActions.addFleetStatus),
      mergeMap((action) =>
        this.service.post(action.data).pipe(
          map((data) =>
            FleetStatusAssetActions.fleetStatusAddedSuccessfully({
              data: data.message
            })
          ),
          catchError((error) =>
            of(FleetStatusAssetActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: FleetStatusAssetService,
    private _tableFacade: TableFacade
  ) {}
}
