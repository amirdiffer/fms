import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovementRequestsActions } from './movement-requests.actions';
import { MovementRequestsService } from './movement-requests.service';

@Injectable()
export class MovementRequestsEffect {
  LoadAllMovementRequestss$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementRequestsActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => MovementRequestsActions.allDataLoaded({ data })),
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
