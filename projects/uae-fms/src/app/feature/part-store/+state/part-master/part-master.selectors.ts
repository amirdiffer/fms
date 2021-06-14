import {
  partMasterCategoryAdapter,
  partMasterItemAdapter,
  PARTSTORE_PARTMASTER_FEATURE_KEY
} from './part-master.entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const select = (adapter) => {
  if ((adapter = 'category')) {
    const { selectAll } = partMasterCategoryAdapter.getSelectors();
    return selectAll;
  } else {
    const { selectAll } = partMasterItemAdapter.getSelectors();
    return selectAll;
  }
};
export class PartMasterSelectors {
  static featureSelector = createFeatureSelector(
    PARTSTORE_PARTMASTER_FEATURE_KEY
  );

  static partMasterCategorySelector = createSelector(
    PartMasterSelectors.featureSelector,
    (state) => state['PartMasterCategory']
  );

  static partMasterItemSelector = createSelector(
    PartMasterSelectors.featureSelector,
    (state) => state['PartMasterItem']
  );

  static selectAllCategory = createSelector(
    PartMasterSelectors.partMasterCategorySelector,
    select('category')
  );

  static categoryOfAsset = createSelector(
    PartMasterSelectors.partMasterCategorySelector,
    (state) => state.listCategoryOfAsset
  );

  static categoryOfSubAsset = createSelector(
    PartMasterSelectors.partMasterCategorySelector,
    (state) => state.listCategoryOfSubAsset
  );

  static selectAllItem = createSelector(
    PartMasterSelectors.partMasterItemSelector,
    select('item')
  );

  static specificCategory = createSelector(
    PartMasterSelectors.partMasterCategorySelector,
    (state) => state.specificCategory
  );

  static specificItem = createSelector(
    PartMasterSelectors.partMasterItemSelector,
    (state) => state.specificItem
  );

  static submittedCategory = createSelector(
    PartMasterSelectors.partMasterCategorySelector,
    (state) => state.submitted
  );

  static submittedItem = createSelector(
    PartMasterSelectors.partMasterItemSelector,
    (state) => state.submitted
  );

  static messageCategory = createSelector(
    PartMasterSelectors.partMasterCategorySelector,
    (state) => state.message
  );

  static errorCatgeory = createSelector(
    PartMasterSelectors.partMasterCategorySelector,
    (state) => state.error
  );

  static messageItem = createSelector(
    PartMasterSelectors.partMasterItemSelector,
    (state) => state.message
  );

  static errorItem = createSelector(
    PartMasterSelectors.partMasterItemSelector,
    (state) => state.error
  );
}
