import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

export const PARTSTORE_ORDERLIST_FEATURE_KEY = 'order-list';

export interface OrderListStateModel {
  Item: string;
  Part_ID: string;
  Status: string;
  Cost: string;
  Quantity: string;
  Department: string;
  Description: string;
  Date: string;
  Total: string;
  ButtonReject: string;
  ButtonApprove: string;
}

export interface OrderListState extends EntityState<OrderListStateModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export interface OrderListPartialState {
  [PARTSTORE_ORDERLIST_FEATURE_KEY]: OrderListState;
}

export const orderListAdapter: EntityAdapter<OrderListStateModel> = createEntityAdapter<
  OrderListStateModel
>();

export const initialState: OrderListState = orderListAdapter.getInitialState({
  loaded: null,
  message: null,
  error: null
} as OrderListState);
