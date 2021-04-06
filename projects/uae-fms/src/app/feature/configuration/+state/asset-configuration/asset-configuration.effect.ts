import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssetConfigurationActions } from './asset-configuration.actions';
import { AssetConfigurationService } from './asset-configuration.service';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class AssetConfigurationEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetConfigurationActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            console.log(data.resultNumber)
            this._tableFacade.initialPaginator(data.resultNumber, 'asset-configuration');
            return AssetConfigurationActions.allDataLoaded({ data: data.message })
          }),
          catchError((error) =>
            of(AssetConfigurationActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: AssetConfigurationService,
    private _tableFacade: TableFacade
  ) {}
}
