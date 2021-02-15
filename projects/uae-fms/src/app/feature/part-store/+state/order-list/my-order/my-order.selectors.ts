import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '@feature/part-store/+state/part-store.selectors';
import { myOrderListAdapter } from '@feature/part-store/+state/order-list/my-order/my-order.entity';

export class MyOrderSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.myOrderListSelector,
    myOrderListAdapter.setAll
  );
}
