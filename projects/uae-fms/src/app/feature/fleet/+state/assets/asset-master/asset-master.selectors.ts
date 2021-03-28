import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '@feature/fleet/+state/fleet.selectors';
import { assetMasterAdapter } from '@feature/fleet/+state/assets/asset-master/asset-master.entity';

export class AssetMasterSelectors {
  static selectAll = createSelector(
    FleetSelectors.assetMasterSelector,
    assetMasterAdapter.setAll
  );
}
