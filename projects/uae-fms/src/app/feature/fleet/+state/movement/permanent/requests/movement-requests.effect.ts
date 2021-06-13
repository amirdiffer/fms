import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovementRequestsActions } from './movement-requests.actions';
import { MovementRequestsService } from './movement-requests.service';
import { TableFacade } from '@core/table/+state/table.facade';
import { Store } from '@ngrx/store';

@Injectable()
export class MovementRequestsEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(
              data.resultNumber,
              'movement_request'
            );
            this._store.dispatch(
              MovementRequestsActions.count({ data: data.resultNumber })
            );
            return MovementRequestsActions.allDataLoaded({
              data: data.message
            });
          }),
          catchError((error) =>
            of(MovementRequestsActions.error({ reason: error }))
          )
        )
      )
    )
  );

  MovementRequestsStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActions.loadStatistic),
      mergeMap((action) =>
        this.service.loadRequestStatistic().pipe(
          map((data) =>
            MovementRequestsActions.statisticRequestLoaded({
              data: data.message
            })
          ),
          catchError((error) =>
            of(MovementRequestsActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addMovementRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActions.addMovementRequest),
      mergeMap((action) =>
        this.service.addMovementRequest(action.data).pipe(
          map((data) =>
            MovementRequestsActions.movementRequestAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) =>
            of(MovementRequestsActions.error({ reason: error }))
          )
        )
      )
    )
  );

  editMovementRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActions.editMovementRequest),
      mergeMap((action) =>
        this.service.editMovementRequest(action.data).pipe(
          map((data) =>
            MovementRequestsActions.movementRequestEditedSuccessfully({
              data: data.message
            })
          ),
          catchError((error) =>
            of(MovementRequestsActions.error({ reason: error }))
          )
        )
      )
    )
  );

  reject$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActions.reject),
      mergeMap((action) =>
        this.service.rejectRequest(action.data).pipe(
          map((data) =>
            MovementRequestsActions.rejectSuccessfully({ data: data.message })
          ),
          catchError((error) =>
            of(MovementRequestsActions.error({ reason: error }))
          )
        )
      )
    )
  );

  assign$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActions.assign),
      mergeMap((action) =>
        this.service.assignRequest(action.id, action.data).pipe(
          map((data) =>
            MovementRequestsActions.assignSuccessfully({ data: data.message })
          ),
          catchError((error) =>
            of(MovementRequestsActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: MovementRequestsService,
    private _tableFacade: TableFacade,
    private _store: Store
  ) {}
}
