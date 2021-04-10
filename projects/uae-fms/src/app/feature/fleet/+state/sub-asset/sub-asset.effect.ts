import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubAssetActions } from './sub-asset.actions';
import { SubAssetService } from './sub-asset.service';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class SubAssetEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(SubAssetActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'sub-asset');
            return  SubAssetActions.allDataLoaded({ data: data.message })
          }),
          catchError((error) => of(SubAssetActions.error({ reason: error })))
        )
      )
    )
  );

  addSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(SubAssetActions.addSubAsset),
      mergeMap((action) =>
        this.service.postSubAsset(action.data).pipe(
          map((data) =>
            SubAssetActions.addSubAssetSuccessfully({
              data: data.message
            })
          ),
          catchError((error) => of(SubAssetActions.error({ reason: error })))
        )
      )
    )
  );

  editSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(SubAssetActions.editSubAsset),
      mergeMap((action) =>
        this.service.editSubAsset(action.data).pipe(
          map((data) =>
            SubAssetActions.editSubAssetSuccessfully({ data: action.data})
          ),
          catchError((error) => of(SubAssetActions.error({ reason: error })))
        )
      )
    )
  );

  loadStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(SubAssetActions.loadStatistics),
      mergeMap((action) =>
        this.service.loadStatistics().pipe(
          map((data) => SubAssetActions.statisticsLoaded({ data })),
          catchError((error) => of(SubAssetActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: SubAssetService, private _tableFacade: TableFacade) {}
}
