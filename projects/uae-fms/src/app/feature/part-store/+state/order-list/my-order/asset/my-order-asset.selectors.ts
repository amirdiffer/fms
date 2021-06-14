import { createSelector } from '@ngrx/store';
import { myOrderListAdapter } from './my-order-asset.entity';
const { selectAll } = myOrderListAdapter.getSelectors();
const myOrderAssetState = (state) => state['my-order-asset'];

export class MyOrderAssetSelectors {
  static selectAll = createSelector(myOrderAssetState, selectAll);

  static message = createSelector(myOrderAssetState, (state) => state.message);

  static error = createSelector(myOrderAssetState, (state) => state.error);

  static submitted = createSelector(
    myOrderAssetState,
    (state) => state.submitted
  );
}
