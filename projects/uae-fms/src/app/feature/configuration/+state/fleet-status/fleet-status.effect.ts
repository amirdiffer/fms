import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FleetStatusActions } from './fleet-status.actions';
import { FleetStatusService } from './fleet-status.service';

@Injectable()
export class FleetStatusEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(FleetStatusActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => FleetStatusActions.allDataLoaded({ data })),
          catchError((error) => of(FleetStatusActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: FleetStatusService) {}
}
