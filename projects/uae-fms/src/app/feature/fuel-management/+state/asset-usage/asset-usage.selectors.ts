import { createSelector } from '@ngrx/store';
import { FuelManagementSelectors } from '../fuel-management.selectors';
import { assetUsageAdapter } from './asset-usage.entity';

export class AssetUsageSelectors {
  static selectAll = createSelector(
    FuelManagementSelectors.assetUsageSelector,
    assetUsageAdapter.setAll
  );
  static message = createSelector(
    FuelManagementSelectors.assetUsageSelector,
    (state) => state.message
  );
  static error = createSelector(
    FuelManagementSelectors.assetUsageSelector,
    (state) => state.error
  );
}
