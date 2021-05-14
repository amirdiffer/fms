import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MyOrderSubAssetService } from '@feature/part-store/+state/order-list/my-order/sub-asset/my-order-sub-asset.service';
import { MyOrderSubAssetActions } from '@feature/part-store/+state/order-list/my-order/sub-asset/my-order-sub-asset.actions';

@Injectable()
export class MyOrderSubAssetEffects {
  constructor(private action$: Actions, private service: MyOrderSubAssetService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(MyOrderSubAssetActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return MyOrderSubAssetActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) => of(MyOrderSubAssetActions.error({ reason: error })))
        )
      )
    )
  );

  addOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(MyOrderSubAssetActions.addOrder),
      mergeMap((action) =>
        this.service.addOrder(action.data).pipe(
          map((data) =>
            MyOrderSubAssetActions.orderAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(MyOrderSubAssetActions.error({ reason: error })))
        )
      )
    )
  );

  addRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(MyOrderSubAssetActions.addRequest),
      mergeMap((action) =>
        this.service.addRequest(action.data).pipe(
          map((data) =>
            MyOrderSubAssetActions.requestAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(MyOrderSubAssetActions.error({ reason: error })))
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(MyOrderSubAssetActions.updateOrder),
      mergeMap((action) =>
        this.service.updateOrder(action.data).pipe(
          map((data) =>
            MyOrderSubAssetActions.orderUpdatedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(MyOrderSubAssetActions.error({ reason: error })))
        )
      )
    )
  );

  receiveOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(MyOrderSubAssetActions.receiveOrder),
      mergeMap((action) =>
        this.service.receiveOrder(action.data).pipe(
          map((data) =>
            MyOrderSubAssetActions.orderReceivedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(MyOrderSubAssetActions.error({ reason: error })))
        )
      )
    )
  );
}
