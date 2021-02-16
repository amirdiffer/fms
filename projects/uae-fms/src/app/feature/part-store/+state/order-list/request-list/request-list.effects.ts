import { RequestListService } from '@feature/part-store/+state/order-list/request-list/request-list.service';
import { RequestListActions } from '@feature/part-store/+state/order-list/request-list/request-list.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class RequestListEffect {
  constructor(private action$: Actions, private service: RequestListService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return RequestListActions.allDataLoaded({ data });
          }),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );
}
