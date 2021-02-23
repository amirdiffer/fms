import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AssetMasterActions } from '@feature/fleet/+state/assets/asset-master/asset-master.actions';
import { AssetMasterService } from '@feature/fleet/+state/assets/asset-master/asset-master.service';

@Injectable()
export class AssetMasterEffects {
  constructor(private action$: Actions, private service: AssetMasterService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetMasterActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return AssetMasterActions.allDataLoaded({ data });
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
}
