import { partMasterCategoryAdapter, partMasterItemAdapter } from './part-master.entity';
import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '../part-store.selectors';
const { selectAll } = partMasterCategoryAdapter.getSelectors();

export class PartMasterSelectors {

  static selectAllCategory = createSelector(
    PartStoreSelectors.partMasterCategorySelector,
    selectAll
  );

  static selectAllItem = createSelector(
    PartStoreSelectors.partMasterItemSelector,
    partMasterItemAdapter.setAll
  );

  static specificCategory = createSelector(
    PartStoreSelectors.partMasterCategorySelector,
    (state) => state.specificCategory
  );

  static specificItem = createSelector(
    PartStoreSelectors.partMasterItemSelector,
    (state) => state.specificItem
  );
  
  static submittedCategory = createSelector(
    PartStoreSelectors.partMasterCategorySelector,
    (state) => state.submitted
  );

  static submittedItem = createSelector(
    PartStoreSelectors.partMasterItemSelector,
    (state) => state.submitted
  );

  static messageCategory = createSelector(
    PartStoreSelectors.partMasterCategorySelector,
    (state) => state.message
  );

  static errorCatgeory = createSelector(
    PartStoreSelectors.partMasterCategorySelector,
    (state) => state.error
  );

  static messageItem = createSelector(
    PartStoreSelectors.partMasterItemSelector,
    (state) => state.message
  );

  static errorItem = createSelector(
    PartStoreSelectors.partMasterItemSelector,
    (state) => state.error
  );
}
