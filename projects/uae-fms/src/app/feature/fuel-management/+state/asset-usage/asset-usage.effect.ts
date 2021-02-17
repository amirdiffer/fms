import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssetUsageActions } from './asset-usage.actions';
import { AssetUsageService } from './asset-usage.service';

@Injectable()
export class AssetUsageEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetUsageActions.loadAssetUsage),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => AssetUsageActions.assetUsageLoaded({ data })),
          catchError((error) =>
            of(AssetUsageActions.assetUsageError({ reason: error }))
          )
        )
      )
    )
  );

  constructor(private action$: Actions, private service: AssetUsageService) {}
}
