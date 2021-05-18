
import { Injectable } from '@angular/core';
import { TableFacade } from '@core/table/+state/table.facade';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OrderListActions } from './order.actions';
import { OrderListService } from './order.service';

@Injectable()
export class OrderListEffect {
  constructor(private action$: Actions, private service: OrderListService , private _tableFacade: TableFacade) {}

   /* '''''Load''''' Order For Asset and Sub Asset */
  loadOrderPartforAsset$ = createEffect(() =>
   this.action$.pipe(
     ofType(OrderListActions.loadOrderPartforAsset),
     mergeMap((action) =>
       this.service.loadOrderPartOfAsset().pipe(
         map((data) => {
          this._tableFacade.initialPaginator(data.resultNumber, 'part-store-order-list');
           return OrderListActions.allOrderListForAssetLoaded({ data: data.message });
         }),
         catchError((error) => of(OrderListActions.error({ reason: error })))
       )
     )
   )
 );

  loadOrderPartforSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrderListActions.loadOrderPartforSubAsset),
      mergeMap((action) =>
        this.service.loadOrderPartOfSubAsset().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'part-store-order-list');
            return OrderListActions.allOrderListForSubAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(OrderListActions.error({ reason: error })))
        )
      )
    )
  );

  

  /* '''''Load''''' statistics of order For Asset and Sub Asset */
  loadStatisticsOfOrderPartforAsset$ = createEffect(() =>
   this.action$.pipe(
     ofType(OrderListActions.loadStatisticsOfOrderPartforAsset),
     mergeMap((action) =>
       this.service.loadStatisticsOfOrderPartOfAsset().pipe(
         map((data) => {
           return OrderListActions.allStatisticsOfOrderListForAssetLoaded({ data: data.message });
         }),
         catchError((error) => of(OrderListActions.error({ reason: error })))
        )
      )
    )
  );

  loadStatisticsOfOrderPartforSubAsset$ = createEffect(() =>
   this.action$.pipe(
     ofType(OrderListActions.loadStatisticsOfOrderPartforSubAsset),
     mergeMap((action) =>
       this.service.loadStatisticsOfOrderPartOfSubAsset().pipe(
         map((data) => {
           return OrderListActions.allStatisticsOfOrderListForSubAssetLoaded({ data: data.message });
         }),
         catchError((error) => of(OrderListActions.error({ reason: error })))
        )
      )
    )
  );



  /* ''''''Add'''''' Order For Asset and Sub Asset */
  addOrderPartAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrderListActions.addOrderPartAsset),
      mergeMap((action) =>
        this.service.addOrderOfAsset(action.data).pipe(
          map((data) =>
            OrderListActions.orderOfAssetPartAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(OrderListActions.error({ reason: error })))
        )
      )
    )
  );

  addOrderPartSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrderListActions.addOrderPartSubAsset),
      mergeMap((action) =>
        this.service.addOrderfSubAsset(action.data).pipe(
          map((data) =>
            OrderListActions.orderOfSubAssetPartAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(OrderListActions.error({ reason: error })))
        )
      )
    )
  );


  /* '''''Get''''' Specific order for asset and sub asset */

  getSpecificOrderPartAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrderListActions.getSpecificOrderPartAsset),
      mergeMap((action) =>
        this.service.getSpecificOrderPartOfAsset(action.id).pipe(
          map((data) => {
            return OrderListActions.specificOrderPartOfSubAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(OrderListActions.error({ reason: error })))
        )
      )
    )
  );

  getSpecificOrderPartSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrderListActions.getSpecificOrderPartSubAsset),
      mergeMap((action) =>
        this.service.getSpecificOrderPartOfSubAsset(action.id).pipe(
          map((data) => {
            return OrderListActions.specificOrderPartOfSubAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(OrderListActions.error({ reason: error })))
        )
      )
    )
  );




  /* '''''Update''''' Order of Asset and Sub Asset*/
  updateOrderOfAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrderListActions.updateOrderOfAsset),
      mergeMap((action) =>
        this.service.updateOrderPartOfAsset(action.data).pipe(
          map((data) =>
            OrderListActions.orderOfAssetUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(OrderListActions.error({ reason: error })))
        )
      )
    )
  );

  updateOrderOfSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrderListActions.updateOrderOfSubAsset),
      mergeMap((action) =>
        this.service.updateOrderPartOfSubAsset(action.data).pipe(
          map((data) =>
            OrderListActions.orderOfSubAssetUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(OrderListActions.error({ reason: error })))
        )
      )
    )
  );



  /* '''''Receive''''' Request of Asset and Sub Asset*/
  receiveSpecificOrderPartofAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrderListActions.receiveSpecificOrderPartAsset),
      mergeMap((action) =>
        this.service.receiveSpecificOrderPartOfAsset(action.id).pipe(
          map((data) => {
            return OrderListActions.specificOrderPartOfAssetReceivedSuccessfully({ data: data.message });
          }),
          catchError((error) => of(OrderListActions.error({ reason: error })))
        )
      )
    )
  );

  receiveSpecificOrderPartofSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrderListActions.receiveSpecificOrderPartSubAsset),
      mergeMap((action) =>
        this.service.receiveSpecificOrderPartOfSubAsset(action.id).pipe(
          map((data) => {
            return OrderListActions.specificOrderPartOfSubAssetReceivedSuccessfully({ data: data.message });
          }),
          catchError((error) => of(OrderListActions.error({ reason: error })))
        )
      )
    )
  );

}
