import { Action, createReducer, on } from '@ngrx/store';
import {
  MyOrderListState,
  initialState,
  myOrderListAdapter
} from '@feature/part-store/+state/order-list/my-order/my-order.entity';
import { MyOrderActions } from '@feature/part-store/+state/order-list/my-order/my-order.actions';

const myOrderReducer = createReducer(
  initialState,
  on(MyOrderActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(MyOrderActions.allDataLoaded, (state, { data }) =>
    myOrderListAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(MyOrderActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: MyOrderListState, action: Action) {
  return myOrderReducer(state, action);
}
