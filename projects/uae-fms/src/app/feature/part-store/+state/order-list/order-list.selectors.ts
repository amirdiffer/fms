import { orderListAdapter } from './order-list.entity';
import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '../part-store.selectors';

export class OrderListSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.orderListSelector,
    orderListAdapter.setAll
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
