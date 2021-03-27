import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
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

  addMovementRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementOverviewActions.addMovementRequest),
      mergeMap((action) =>
        this.service.addMovementRequest(action.data).pipe(
          map((data) =>
            MovementOverviewActions.movementRequestAddedSuccessfully({ data: { ...action.data, ...data.message } })
          ),
          catchError((error) => of(MovementOverviewActions.error({ reason: error })))
        )
      )
    )
  );

  editMovementRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementOverviewActions.editMovementRequest),
      mergeMap((action) =>
        this.service.editMovementRequest(action.data).pipe(
          map((data) =>
            MovementOverviewActions.movementRequestEditedSuccessfully({ data: data.message })
          ),
          catchError((error) => of(MovementOverviewActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: MovementOverviewService
  ) {}
}
