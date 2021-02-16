import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface IMyOrderListModel {
  statusColor: string,
  Item: string,
  Part_ID: string,
  Quantity: string,
  Date: string,
  Description: string,
  Expected_Receive_date: string,
  Cost: string,
  Total: string,
  Status: string,
  ButtonRecived: string
}

export interface MyOrderListState extends EntityState<IMyOrderListModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export const PARTSTORE_MY_ORDER_LIST_FEATURE_KEY = 'my-order';

export interface IMyOrderListPartialState {
  [PARTSTORE_MY_ORDER_LIST_FEATURE_KEY]: MyOrderListState;
}

export const myOrderListAdapter: EntityAdapter<IMyOrderListModel> = createEntityAdapter<
  IMyOrderListModel
>();

export const initialState: MyOrderListState = myOrderListAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null
  } as MyOrderListState
);
