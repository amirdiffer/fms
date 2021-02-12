import {
  initialState,
  orderListAdapter,
  OrderListState
} from './order-list.entity';
import { Action, createReducer, on } from '@ngrx/store';
import { OrderListActions } from './order-list.actions';

const orderListReducer = createReducer(
  initialState,
  on(OrderListActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(OrderListActions.allDataLoaded, (state, { data }) =>
    orderListAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(OrderListActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: OrderListState, action: Action) {
  return orderListReducer(state, action);
}
