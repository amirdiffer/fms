import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovementOverviewActions } from './movement-overview.actions';
import { MovementOverviewService } from './movement-overview.service';

@Injectable()
export class MovementOverviewEffect {
  LoadAllMovementOverviews$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementOverviewActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => MovementOverviewActions.allDataLoaded({ data })),
          catchError((error) =>
            of(MovementOverviewActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: MovementOverviewService
  ) {}
}
