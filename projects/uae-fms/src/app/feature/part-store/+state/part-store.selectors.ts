import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PARTSTORE_FEATURE_KEY } from './part-store.entity';

export class PartStoreSelectors {
  static featureSelector = createFeatureSelector(PARTSTORE_FEATURE_KEY);

  static assetPartList = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['assetPartList']
  );
  static subAssetPartList = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['subAssetPartList']
  );

  static requestListSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['request-list']
  );

  static myOrderAssetListSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['my-order-asset']
  );

  static myOrderSubAssetListSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['my-order-sub-asset']
  );

  static suppliersListSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['suppliers']
  );
  static partMasterCategorySelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['PartMasterCategory']
  );
  static partMasterItemSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['PartMasterItem']
  );
}
