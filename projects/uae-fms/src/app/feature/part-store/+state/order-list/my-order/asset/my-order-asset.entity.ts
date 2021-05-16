import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface IMyOrderListModel {
  statusColor: string;
  Item: string;
  Part_ID: string;
  Quantity: string;
  Date: string;
  Description: string;
  Expected_Receive_date: string;
  Cost: string;
  Total: string;
  Status: string;
  ButtonRecived: string;
}

export interface MyOrderAssetListState extends EntityState<IMyOrderListModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
  submitted?: boolean;
}

export const PARTSTORE_MY_ORDER_ASSET_LIST_FEATURE_KEY = 'my-order-asset';

export interface IMyOrderAssetListPartialState {
  [PARTSTORE_MY_ORDER_ASSET_LIST_FEATURE_KEY]: MyOrderAssetListState;
}

export const myOrderListAdapter: EntityAdapter<IMyOrderListModel> = createEntityAdapter<
  IMyOrderListModel
>();

export const initialState: MyOrderAssetListState = myOrderListAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null,
    submitted: false
  } as MyOrderAssetListState
);
