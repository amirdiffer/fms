import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PARTSTORE_FEATURE_KEY } from './part-store.entity';

export class PartStoreSelectors {
  static featureSelector = createFeatureSelector(PARTSTORE_FEATURE_KEY);

  static partListSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['part-list']
  );
  static requestListSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['request-list']
  );
  static myOrderListSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['my-order']
  );
  static suppliersListSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['suppliers']
  );
  static partMasterSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['part-master']
  );
}
