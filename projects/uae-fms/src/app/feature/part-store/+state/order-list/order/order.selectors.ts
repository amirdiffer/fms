import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '@feature/part-store/+state/part-store.selectors';
import { orderListAdapter } from './order.entity';
const { selectAll } = orderListAdapter.getSelectors();

export class OrderListSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.orderListSelector,
    selectAll
  );

  static specificOrder = createSelector(
    PartStoreSelectors.orderListSelector,
    (state) => state.specificOrder
  );

  static statistics = createSelector(
    PartStoreSelectors.orderListSelector,
    (state) => state.statistics
  );

  static submitted = createSelector(
    PartStoreSelectors.orderListSelector,
    (state) => state.submitted
  );

  static message = createSelector(
    PartStoreSelectors.orderListSelector,
    (state) => state.message
  );

  static error = createSelector(
    PartStoreSelectors.orderListSelector,
    (state) => state.error
  );
}
