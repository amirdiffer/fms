import { Action, createReducer, on } from '@ngrx/store';
import {
  MyOrderAssetListState,
  initialState,
  myOrderListAdapter
} from '@feature/part-store/+state/order-list/my-order/asset/my-order-asset.entity';
import { MyOrderAssetActions } from '@feature/part-store/+state/order-list/my-order/asset/my-order-asset.actions';

const myOrderAssetReducer = createReducer(
  initialState,
  on(MyOrderAssetActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(MyOrderAssetActions.allDataLoaded, (state, { data }) =>
    myOrderListAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),

  on(MyOrderAssetActions.addOrder, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(MyOrderAssetActions.orderAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(MyOrderAssetActions.addRequest, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(MyOrderAssetActions.requestAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(MyOrderAssetActions.updateOrder, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(MyOrderAssetActions.orderUpdatedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(MyOrderAssetActions.receiveOrder, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(MyOrderAssetActions.orderReceivedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(MyOrderAssetActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  on(MyOrderAssetActions.reset, (state) => ({
    ...state,
    submitted: false,
    error: false,
    message: null
  }))
);

export function reducer(state: MyOrderAssetListState, action: Action) {
  return myOrderAssetReducer(state, action);
}
