import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FleetStatusAssetActions } from './fleet-status-asset.actions';
import { FleetStatusAssetService } from './fleet-status-asset.service';

@Injectable()
export class FleetStatusAssetEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(FleetStatusAssetActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) =>
            FleetStatusAssetActions.allDataLoaded({ data: data.message })
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
    private service: FleetStatusAssetService
  ) {}
}
