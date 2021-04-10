import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssetPolicyActions } from './asset-policy.actions';
import { AssetPolicyService } from './asset-policy.service';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class AssetPolicyEffect {
  loadAllAssets$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetPolicyActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'asset-policy_asset');
            return AssetPolicyActions.allDataLoaded({ data: data.message })
          }),
          catchError((error) => of(AssetPolicyActions.error({ reason: error })))
        )
      )
    )
  );
  addAssetPolicy$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetPolicyActions.addAssetPolicy),
      mergeMap((action) =>
        this.service.postAssetPolicy(action.data).pipe(
          map((data) =>
            AssetPolicyActions.addAssetPolicySuccessfully({
              data: data.message
            })
          ),
          catchError((error) => of(AssetPolicyActions.error({ reason: error })))
        )
      )
    )
  );

  updateAssetPolicy$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetPolicyActions.editAssetPolicy),
      mergeMap((action) =>
        this.service.updateAssetPolicy(action.data).pipe(
          map((data) =>
            AssetPolicyActions.editAssetPolicySuccessfully({
              data: data.message
            })
          ),
          catchError((error) => of(AssetPolicyActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: AssetPolicyService, private _tableFacade: TableFacade) {}
}
