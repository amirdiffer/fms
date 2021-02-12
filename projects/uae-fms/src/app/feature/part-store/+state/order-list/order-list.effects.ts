import { OrderListService } from './order-list.service';
import { OrderListActions } from './order-list.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class OrderListEffect {
  constructor(private action$: Actions, private service: OrderListService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrderListActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return OrderListActions.allDataLoaded({ data });
          }),
          catchError((error) => of(OrderListActions.error({ reason: error })))
        )
      )
    )
  );
}
