import { createSelector } from '@ngrx/store';
import { assetTypeAdapter } from './asset-type.entity';
import { ConfigurationSelectors } from '../../configuration.selectors';
const { selectAll } = assetTypeAdapter.getSelectors();

export class AssetTypeSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.assetTypeSelector,
    selectAll
  );

  static message = createSelector(
    ConfigurationSelectors.assetTypeSelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.assetTypeSelector,
    (state) => state.error
  );

  static submitted = createSelector(
    ConfigurationSelectors.assetTypeSelector,
    (state) => state.submitted
  );

  static loaded = createSelector(
    ConfigurationSelectors.assetTypeSelector,
    (state) => state.loaded
  );
}
