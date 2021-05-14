import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '@feature/part-store/+state/part-store.selectors';
import { myOrderListAdapter } from '@feature/part-store/+state/order-list/my-order/asset/my-order-asset.entity';
const { selectAll } = myOrderListAdapter.getSelectors();

export class MyOrderAssetSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.myOrderAssetListSelector,
    selectAll
  );

  static message = createSelector(
    PartStoreSelectors.myOrderAssetListSelector,
    (state) => state.message
  );

  static error = createSelector(
    PartStoreSelectors.myOrderAssetListSelector,
    (state) => state.error
  );

  static submitted = createSelector(
    PartStoreSelectors.myOrderAssetListSelector,
    (state) => state.submitted
  );
}
