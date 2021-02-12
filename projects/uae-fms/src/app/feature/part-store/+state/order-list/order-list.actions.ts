import { OrderListStateModel } from './order-list.entity';
import { createAction, props } from '@ngrx/store';

export class OrderListActions {
  static loadAll = createAction('[OrderList] load all data');

  static allDataLoaded = createAction(
    '[OrderList] all datas are loaded',
    props<{ data: OrderListStateModel[] }>()
  );

  static error = createAction(
    '[OrderList] error occurred',
    props<{ reason: any }>()
  );
}
