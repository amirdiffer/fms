import { partMasterAdapter } from './part-master.entity';
import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '../part-store.selectors';

export class PartMasterSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.partMasterSelector,
    partMasterAdapter.setAll
  );

  static message = createSelector(
    PartStoreSelectors.partMasterSelector,
    (state) => state.message
  );

  static error = createSelector(
    PartStoreSelectors.partMasterSelector,
    (state) => state.error
  );
}
