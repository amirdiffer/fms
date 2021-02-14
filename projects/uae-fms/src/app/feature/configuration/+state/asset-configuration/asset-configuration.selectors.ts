import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../configuration.selectors';
import { assetConfigurationAdapter } from './asset-configuration.entity';

export class AssetConfigurationSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.assetConfigurationSelector,
    assetConfigurationAdapter.setAll
  );

  static message = createSelector(
    ConfigurationSelectors.assetConfigurationSelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.assetConfigurationSelector,
    (state) => state.error
  );
}
