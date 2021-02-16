import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FleetStatusSubAssetActions } from './fleet-status-sub-asset.actions';
import { FleetStatusSubAssetService } from './fleet-status-sub-asset.service';

@Injectable()
export class FleetStatusSubAssetEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(FleetStatusSubAssetActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => FleetStatusSubAssetActions.allDataLoaded({ data })),
          catchError((error) =>
            of(FleetStatusSubAssetActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: FleetStatusSubAssetService
  ) {}
}
