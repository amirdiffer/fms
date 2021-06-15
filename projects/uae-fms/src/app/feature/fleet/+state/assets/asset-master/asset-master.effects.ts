import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AssetMasterActions } from './asset-master.actions';
import { AssetMasterService } from './asset-master.service';
import { TableFacade } from '@core/table/+state/table.facade';
import { Store } from '@ngrx/store';

@Injectable()
export class AssetMasterEffects {
  constructor(
    private action$: Actions,
    private service: AssetMasterService,
    private _tableFacade: TableFacade,
    private _store: Store
  ) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetMasterActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(
              data.resultNumber,
              'asset_asset-master'
            );
            this._store.dispatch(
              AssetMasterActions.count({ data: data.resultNumber })
            );
            return AssetMasterActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) => of(AssetMasterActions.error({ reason: error })))
        )
      )
    )
  );

  loadStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetMasterActions.loadStatistics),
      mergeMap((action) =>
        this.service.loadStatistics().pipe(
          map((data) => AssetMasterActions.statisticsLoaded({ data })),
          catchError((error) => of(AssetMasterActions.error({ reason: error })))
        )
      )
    )
  );

  addAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetMasterActions.addAsset),
      mergeMap((action) =>
        this.service.addAsset(action.data).pipe(
          map((data) =>
            AssetMasterActions.assetAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(AssetMasterActions.error({ reason: error })))
        )
      )
    )
  );

  editAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetMasterActions.editAsset),
      mergeMap((action) =>
        this.service.editAsset(action.data).pipe(
          map((data) =>
            AssetMasterActions.assetEditedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(AssetMasterActions.error({ reason: error })))
        )
      )
    )
  );
  getAssetByID = createEffect(() =>
    this.action$.pipe(
      ofType(AssetMasterActions.assetById),
      mergeMap((action) =>
        this.service.getAssetByID(action.id).pipe(
          map((data) => {
            return AssetMasterActions.assetByIdLoaded({ data: data.message });
          }),
          catchError((error) => of(AssetMasterActions.error({ reason: error })))
        )
      )
    )
  );
}
