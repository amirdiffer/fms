import { createSelector } from '@ngrx/store';
import { assetTypeAdapter } from './asset-type.entity';


const { selectAll } = assetTypeAdapter.getSelectors();
const assetTypeSelector = (state) => state['assetType'];
export class AssetTypeSelectors {
    static selectAll = createSelector(
      assetTypeSelector,
      selectAll
    );

    static specificAssetType = createSelector(
      assetTypeSelector,
      (state) => state.assetType
    );

    static message = createSelector(
      assetTypeSelector,
      (state) => state.message
    );

    static error = createSelector(
      assetTypeSelector,
      (state) => state.error
    );

    static submitted = createSelector(
      assetTypeSelector,
      (state) => state.submitted
    );

    static loaded = createSelector(
      assetTypeSelector,
      (state) => state.loaded
    );
  }
