import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PartListService } from './part-list.service';
import { PartListActions } from './part-list.actions';

@Injectable()
export class PartListEffect {
  constructor(private action$: Actions, private service: PartListService) {}

  loadAllAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.loadAllAsset),
      mergeMap((action) =>
        this.service.loadAllAsset().pipe(
          map((data) => {
            return PartListActions.allAssetDataLoaded({ data });
          }),
          catchError((error) => of(PartListActions.error({ reason: error })))
        )
      )
    )
  );

  loadAllSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.loadAllSubAsset),
      mergeMap((action) =>
        this.service.loadAllSubAsset().pipe(
          map((data) => {
            return PartListActions.allSubAssetDataLoaded({ data });
          }),
          catchError((error) => of(PartListActions.error({ reason: error })))
        )
      )
    )
  );

  loadAssetStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.loadAssetStatistics),
      mergeMap((action) =>
        this.service.loadAssetStatistics().pipe(
          map((data) => PartListActions.assetStatisticsLoaded({ data })),
          catchError((error) => of(PartListActions.error({ reason: error })))
        )
      )
    )
  );

  loadSubAssetStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.loadSubAssetStatistics),
      mergeMap((action) =>
        this.service.loadSubAssetStatistics().pipe(
          map((data) => PartListActions.subAssetStatisticsLoaded({ data })),
          catchError((error) => of(PartListActions.error({ reason: error })))
        )
      )
    )
  );
}
