import { createSelector } from '@ngrx/store';
import { assetConfigurationAdapter } from './asset-configuration.entity';
const assetConfigurationSelector = (state) => state['assetConfiguration'];
export class AssetConfigurationSelectors {
  static selectAll = createSelector(
    assetConfigurationSelector,
    assetConfigurationAdapter.setAll
  );

  static message = createSelector(
    assetConfigurationSelector,
    (state) => state.message
  );

  static error = createSelector(
    assetConfigurationSelector,
    (state) => state.error
  );
}
