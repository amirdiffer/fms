import { partMasterCategoryAdapter, partMasterItemAdapter } from './part-master.entity';
import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '../part-store.selectors';

export const select = (adapter) =>{
  if(adapter = 'category'){
    const { selectAll } = partMasterCategoryAdapter.getSelectors();
    return selectAll;
  }else{
    const { selectAll } = partMasterItemAdapter.getSelectors();
    return selectAll;
  }
};
export class PartMasterSelectors {

  static selectAllCategory = createSelector(
    PartStoreSelectors.partMasterCategorySelector,
    select('category')
  );

  static selectAllItem = createSelector(
    PartStoreSelectors.partMasterItemSelector,
    select('item')
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
