import { partListAdapter, PartListState } from './part-list.entity';
import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '../part-store.selectors';

export class PartListSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.partListSelector,
    partListAdapter.setAll
  );

  static selectAssetStatistics = createSelector(
    PartStoreSelectors.partListSelector,
    (state: PartListState) => state.assetStatistics
  );

  static selectSubAssetStatistics = createSelector(
    PartStoreSelectors.partListSelector,
    (state: PartListState) => state.subAssetStatistics
  );

  static message = createSelector(
    PartStoreSelectors.partListSelector,
    (state) => state.message
  );

  static error = createSelector(
    PartStoreSelectors.partListSelector,
    (state) => state.error
  );
}
