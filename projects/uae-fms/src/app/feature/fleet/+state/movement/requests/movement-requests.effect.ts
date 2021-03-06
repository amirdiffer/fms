import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovementRequestsActions } from './movement-requests.actions';
import { MovementRequestsService } from './movement-requests.service';

@Injectable()
export class MovementRequestsEffect {

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => MovementRequestsActions.allDataLoaded({ data: data.message })),
          catchError((error) => of(MovementRequestsActions.error({ reason: error })))
        )
      )
    )
  );

  MovementRequestsStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActions.loadStatistic),
      mergeMap((action) =>
        this.service.loadRequestStatistic().pipe(
          map((data) => MovementRequestsActions.statisticRequestLoaded({ data })),
          catchError((error) =>
            of(MovementRequestsActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: MovementRequestsService
  ) {}
}
