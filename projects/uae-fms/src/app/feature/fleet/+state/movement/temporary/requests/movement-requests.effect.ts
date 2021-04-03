import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovementRequestsActionsTemporary } from './movement-requests.actions';
import { MovementRequestsServiceTemporary } from './movement-requests.service';

@Injectable()
export class MovementRequestsEffectTemporary {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActionsTemporary.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) =>
            MovementRequestsActionsTemporary.allDataLoaded({
              data: data.message
            })
          ),
          catchError((error) =>
            of(MovementRequestsActionsTemporary.error({ reason: error }))
          )
        )
      )
    )
  );

  MovementRequestsStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActionsTemporary.loadStatistic),
      mergeMap((action) =>
        this.service.loadRequestStatistic().pipe(
          map((data) =>
            MovementRequestsActionsTemporary.statisticRequestLoaded({ data })
          )
          // catchError((error) =>
          //   of(MovementRequestsActions.error({ reason: error }))
          // )
        )
      )
    )
  );

  addMovementRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActionsTemporary.addMovementRequest),
      mergeMap((action) =>
        this.service.addMovementRequest(action.data).pipe(
          map((data) =>
            MovementRequestsActionsTemporary.movementRequestAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) =>
            of(MovementRequestsActionsTemporary.error({ reason: error }))
          )
        )
      )
    )
  );

  editMovementRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActionsTemporary.editMovementRequest),
      mergeMap((action) =>
        this.service.editMovementRequest(action.data).pipe(
          map((data) =>
            MovementRequestsActionsTemporary.movementRequestEditedSuccessfully({
              data: data.message
            })
          ),
          catchError((error) =>
            of(MovementRequestsActionsTemporary.error({ reason: error }))
          )
        )
      )
    )
  );

  reject$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActionsTemporary.reject),
      mergeMap((action) =>
        this.service.rejectRequest(action.data).pipe(
          map((data) =>
            MovementRequestsActionsTemporary.rejectSuccessfully({
              data: data.message
            })
          ),
          catchError((error) =>
            of(MovementRequestsActionsTemporary.error({ reason: error }))
          )
        )
      )
    )
  );

  assign$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActionsTemporary.assign),
      mergeMap((action) =>
        this.service.assignRequest(action.id, action.data).pipe(
          map((data) =>
            MovementRequestsActionsTemporary.assignSuccessfully({
              data: data.message
            })
          ),
          catchError((error) =>
            of(MovementRequestsActionsTemporary.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: MovementRequestsServiceTemporary
  ) {}
}
