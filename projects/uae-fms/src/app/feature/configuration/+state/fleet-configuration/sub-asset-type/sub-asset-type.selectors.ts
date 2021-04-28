import { createSelector } from "@ngrx/store";
import { ConfigurationSelectors } from "../../configuration.selectors";
import { subAssetTypeAdapter } from "./sub-asset-type.entity";

const { selectAll } = subAssetTypeAdapter.getSelectors();

export class SubAssetTypeSelectors {
      static selectAll = createSelector(
        ConfigurationSelectors.subAssetTypeSelector,
        selectAll
      );

      static specificSubAssetType = createSelector(
        ConfigurationSelectors.subAssetTypeSelector,
        (state) => state.subAssetType
      );

      static message = createSelector(
        ConfigurationSelectors.subAssetTypeSelector,
        (state) => state.message
      );
    
      static error = createSelector(
        ConfigurationSelectors.subAssetTypeSelector,
        (state) => state.error
      );
    
      static submitted = createSelector(
        ConfigurationSelectors.subAssetTypeSelector,
        (state) => state.submitted
      );
    
      static loaded = createSelector(
        ConfigurationSelectors.subAssetTypeSelector,
        (state) => state.loaded
      );
}