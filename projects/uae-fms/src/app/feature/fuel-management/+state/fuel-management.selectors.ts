import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FUEL_MANAGEMENT_FEATURE_KEY } from './fuel-management.entity';

export class FuelManagementSelectors {
  static featureSelector = createFeatureSelector(FUEL_MANAGEMENT_FEATURE_KEY);

  static fuelCardsSelector = createSelector(
    FuelManagementSelectors.featureSelector,
    (state) => state['fuelCards']
  );
  static assetUsageSelector = createSelector(
    FuelManagementSelectors.featureSelector,
    (state) => state['assetUsage']
  );
}
