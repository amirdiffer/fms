import { createSelector } from '@ngrx/store';
import { myOrderListAdapter } from './my-order-sub-asset.entity';
const { selectAll } = myOrderListAdapter.getSelectors();
const myOrderSubAssetState = (state) => state['my-order-sub-asset']

export class MyOrderSubAssetSelectors {
  static selectAll = createSelector(
    myOrderSubAssetState,
    selectAll
  );

  static message = createSelector(
    myOrderSubAssetState,
    (state) => state.message
  );

  static error = createSelector(
    myOrderSubAssetState,
    (state) => state.error
  );

  static submitted = createSelector(
    myOrderSubAssetState,
    (state) => state.submitted
  );
}
