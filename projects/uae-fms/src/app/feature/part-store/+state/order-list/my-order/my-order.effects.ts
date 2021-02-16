import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MyOrderService } from '@feature/part-store/+state/order-list/my-order/my-order.service';
import { MyOrderActions } from '@feature/part-store/+state/order-list/my-order/my-order.actions';

@Injectable()
export class MyOrderEffects {
  constructor(private action$: Actions, private service: MyOrderService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(MyOrderActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return MyOrderActions.allDataLoaded({ data });
          }),
          catchError((error) => of(MyOrderActions.error({ reason: error })))
        )
      )
    )
  );
}
