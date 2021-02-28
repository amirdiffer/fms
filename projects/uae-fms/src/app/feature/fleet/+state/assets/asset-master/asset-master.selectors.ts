import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '@feature/fleet/+state/fleet.selectors';
import { assetMasterAdapter, IAssetMasterState } from './asset-master.entity';

export class AssetMasterSelectors {
  static selectAll = createSelector(
    FleetSelectors.assetMasterSelector,
    assetMasterAdapter.setAll
  );

  static selectStatistics = createSelector(
    FleetSelectors.assetMasterSelector,
    (state: IAssetMasterState) => state.statistics
  );
}
