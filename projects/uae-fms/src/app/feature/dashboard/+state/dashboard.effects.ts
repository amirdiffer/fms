import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DashboardActions } from './dashboard.actions';
import { DashboardService } from './dashboard.service';

@Injectable()
export class DashboardEffect {
  constructor(private action$: Actions, private service: DashboardService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(DashboardActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return DashboardActions.allDataLoaded({ data });
          }),
          catchError((error) => of(DashboardActions.error({ reason: error })))
        )
      )
    )
  );
}
