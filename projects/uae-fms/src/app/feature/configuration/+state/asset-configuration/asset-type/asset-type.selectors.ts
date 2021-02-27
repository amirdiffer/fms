import { createSelector } from '@ngrx/store';
import { assetTypeAdapter } from './asset-type.entity';
import { ConfigurationSelectors } from '../../configuration.selectors';

export class AssetTypeSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.assetTypeSelector,
    assetTypeAdapter.setAll
  );

  static message = createSelector(
    ConfigurationSelectors.assetTypeSelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.assetTypeSelector,
    (state) => state.error
  );
}
