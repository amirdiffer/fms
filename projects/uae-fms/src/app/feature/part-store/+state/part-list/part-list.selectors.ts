import { partListAdapter } from './part-list.entity';
import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '../part-store.selectors';

export class PartListSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.partListSelector,
    partListAdapter.setAll
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
