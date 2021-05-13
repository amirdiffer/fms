import { Action, createReducer, on } from '@ngrx/store';
import {
  MyOrderSubAssetListState,
  initialState,
  myOrderListAdapter
} from '@feature/part-store/+state/order-list/my-order/sub-asset/my-order-sub-asset.entity';
import { MyOrderSubAssetActions } from '@feature/part-store/+state/order-list/my-order/sub-asset/my-order-sub-asset.actions';

const myOrderSubAssetReducer = createReducer(
  initialState,
  on(MyOrderSubAssetActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(MyOrderSubAssetActions.allDataLoaded, (state, { data }) =>
    myOrderListAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),

  on(MyOrderSubAssetActions.addOrder, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(MyOrderSubAssetActions.orderAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(MyOrderSubAssetActions.addRequest, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(MyOrderSubAssetActions.requestAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),


  on(MyOrderSubAssetActions.updateOrder, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(MyOrderSubAssetActions.orderUpdatedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(MyOrderSubAssetActions.receiveOrder, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(MyOrderSubAssetActions.orderReceivedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(MyOrderSubAssetActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  on(MyOrderSubAssetActions.reset, (state) => ({
    ...state,
    submitted: false,
    error: false,
    message: null
  }))
);

export function reducer(state: MyOrderSubAssetListState, action: Action) {
  return myOrderSubAssetReducer(state, action);
}
