import { createAction, props } from '@ngrx/store';
import { IMyOrderListModel } from '@feature/part-store/+state/order-list/my-order/my-order.entity';

export class MyOrderActions {
  static loadAll = createAction('[MyOrderList] load all data');

  static allDataLoaded = createAction(
    '[MyOrderList] all datas are loaded',
    props<{ data: IMyOrderListModel[] }>()
  );

  static error = createAction(
    '[MyOrderList] error occurred',
    props<{ reason: any }>()
  );
}
