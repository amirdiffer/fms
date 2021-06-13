import { createSelector } from '@ngrx/store';
import { orderListAdapter } from './order.entity';
const { selectAll } = orderListAdapter.getSelectors();
const orderListState = (state) => state['orderList']

export class OrderListSelectors {
  static selectAll = createSelector(
    orderListState,
    selectAll
  );

  static specificOrder = createSelector(
    orderListState,
    (state) => state.specificOrder
  );

  static statistics = createSelector(
    orderListState,
    (state) => state.statistics
  );

  static submitted = createSelector(
    orderListState,
    (state) => state.submitted
  );

  static message = createSelector(
    orderListState,
    (state) => state.message
  );

  static error = createSelector(
    orderListState,
    (state) => state.error
  );
}
