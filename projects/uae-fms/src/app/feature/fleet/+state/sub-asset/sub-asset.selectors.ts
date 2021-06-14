import { createSelector } from '@ngrx/store';
import { subAssetAdapter, SubAssetState } from './sub-asset.entity';
const { selectAll } = subAssetAdapter.getSelectors();
const subAssetState = (state) => state['sub-asset'];
export class SubAssetSelectors {
  static selectAll = createSelector(subAssetState, selectAll);

  static selectStatistics = createSelector(
    subAssetState,
    (state: SubAssetState) => state.statistics
  );

  static message = createSelector(subAssetState, (state) => state.message);

  static error = createSelector(subAssetState, (state) => state.error);

  static submitted = createSelector(subAssetState, (state) => state.submitted);

  static spedificSubAsset = createSelector(
    subAssetState,
    (state) => state.specificSubAsset
  );
}
