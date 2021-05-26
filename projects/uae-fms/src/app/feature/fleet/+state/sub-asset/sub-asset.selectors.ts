import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../fleet.selectors';
import { subAssetAdapter, SubAssetState } from './sub-asset.entity';
const { selectAll } = subAssetAdapter.getSelectors();

export class SubAssetSelectors {
  static selectAll = createSelector(FleetSelectors.subAssetSelector, selectAll);

  static selectStatistics = createSelector(
    FleetSelectors.subAssetSelector,
    (state: SubAssetState) => state.statistics
  );

  static message = createSelector(
    FleetSelectors.subAssetSelector,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.subAssetSelector,
    (state) => state.error
  );

  static submitted = createSelector(
    FleetSelectors.subAssetSelector,
    (state) => state.submitted
  );

  static spedificSubAsset = createSelector(
    FleetSelectors.subAssetSelector,
    (state) => state.specificSubAsset
  );
}
