import { createSelector } from "@ngrx/store";
import { subAssetTypeAdapter } from "./sub-asset-type.entity";

const { selectAll } = subAssetTypeAdapter.getSelectors();
const subAssetTypeSelector = (state) => state['subAssetType']
export class SubAssetTypeSelectors {
      static selectAll = createSelector(
        subAssetTypeSelector,
        selectAll
      );

      static specificSubAssetType = createSelector(
        subAssetTypeSelector,
        (state) => state.subAssetType
      );

      static message = createSelector(
        subAssetTypeSelector,
        (state) => state.message
      );

      static error = createSelector(
        subAssetTypeSelector,
        (state) => state.error
      );

      static submitted = createSelector(
        subAssetTypeSelector,
        (state) => state.submitted
      );

      static loaded = createSelector(
        subAssetTypeSelector,
        (state) => state.loaded
      );
}
