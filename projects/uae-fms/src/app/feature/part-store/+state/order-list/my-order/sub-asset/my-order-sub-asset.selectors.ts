import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '@feature/part-store/+state/part-store.selectors';
import { myOrderListAdapter } from '@feature/part-store/+state/order-list/my-order/sub-asset/my-order-sub-asset.entity';
const { selectAll } = myOrderListAdapter.getSelectors();

export class MyOrderSubAssetSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.myOrderSubAssetListSelector,
    selectAll
  );

  static message = createSelector(
    PartStoreSelectors.myOrderSubAssetListSelector,
    (state) => state.message
  );

  static error = createSelector(
    PartStoreSelectors.myOrderSubAssetListSelector,
    (state) => state.error
  );

  static submitted = createSelector(
    PartStoreSelectors.myOrderSubAssetListSelector,
    (state) => state.submitted
  );
}
