import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '@feature/fleet/+state/fleet.selectors';
import { assetMasterAdapter, IAssetMasterState } from './asset-master.entity';
const { selectAll } = assetMasterAdapter.getSelectors();

export class AssetMasterSelectors {
  static selectAll = createSelector(
    FleetSelectors.assetMasterSelector,
    selectAll
  );

  static specificAsset = createSelector(
    FleetSelectors.assetMasterSelector,
    (state) => state.asset
  );
  static selectStatistics = createSelector(
    FleetSelectors.assetMasterSelector,
    (state: IAssetMasterState) => state.statistics
  );

  static error = createSelector(
    FleetSelectors.assetMasterSelector,
    (state) => state.error
  );

  static count = createSelector(
    FleetSelectors.assetMasterSelector,
    (state) => state.resultNumber
  );

  static submitted = createSelector(
    FleetSelectors.assetMasterSelector,
    (state) => state.submitted
  );
}
