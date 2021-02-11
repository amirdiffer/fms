import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PARTSTORE_FEATURE_KEY } from './part-store.entity';

export class PartStoreSelectors {
  static featureSelector = createFeatureSelector(PARTSTORE_FEATURE_KEY);

  static partListSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['part-list']
  );
  static orderListSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['order-list']
  );
  static partMasterSelector = createSelector(
    PartStoreSelectors.featureSelector,
    (state) => state['part-master']
  );
}
