import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MyOrderAssetService } from '@feature/part-store/+state/order-list/my-order/asset/my-order-asset.service';
import { MyOrderAssetActions } from '@feature/part-store/+state/order-list/my-order/asset/my-order-asset.actions';

@Injectable()
export class MyOrderAssetEffects {
  constructor(private action$: Actions, private service: MyOrderAssetService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(MyOrderAssetActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return MyOrderAssetActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) => of(MyOrderAssetActions.error({ reason: error })))
        )
      )
    )
  );

  addOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(MyOrderAssetActions.addOrder),
      mergeMap((action) =>
        this.service.addOrder(action.data).pipe(
          map((data) =>
            MyOrderAssetActions.orderAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(MyOrderAssetActions.error({ reason: error })))
        )
      )
    )
  );

  addRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(MyOrderAssetActions.addRequest),
      mergeMap((action) =>
        this.service.addRequest(action.data).pipe(
          map((data) =>
            MyOrderAssetActions.requestAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(MyOrderAssetActions.error({ reason: error })))
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(MyOrderAssetActions.updateOrder),
      mergeMap((action) =>
        this.service.updateOrder(action.data).pipe(
          map((data) =>
            MyOrderAssetActions.orderUpdatedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(MyOrderAssetActions.error({ reason: error })))
        )
      )
    )
  );

  receiveOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(MyOrderAssetActions.receiveOrder),
      mergeMap((action) =>
        this.service.receiveOrder(action.data).pipe(
          map((data) =>
            MyOrderAssetActions.orderReceivedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(MyOrderAssetActions.error({ reason: error })))
        )
      )
    )
  );
}
