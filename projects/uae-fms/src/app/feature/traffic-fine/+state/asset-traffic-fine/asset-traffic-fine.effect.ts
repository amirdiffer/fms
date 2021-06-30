import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssetTrafficFineActions } from './asset-traffic-fine.actions';
import { AssetTrafficFineService } from './asset-traffic-fine.service';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class AssetTrafficFineEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetTrafficFineActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'asset_traffic_file');
            return AssetTrafficFineActions.allDataLoaded({ data: data.message })
          }),
          catchError((error) =>
            of(AssetTrafficFineActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: AssetTrafficFineService,
    private _tableFacade: TableFacade
  ) {}
}
