import { createSelector } from '@ngrx/store';
import { fleetStatusSubAssetAdapter } from './fleet-status-sub-asset.entity';

const { selectAll } = fleetStatusSubAssetAdapter.getSelectors();
const fleetStatusSubAssetSelector = (state) => state['fleetStatusSubAsset'];
export class FleetStatusSubAssetSelectors {
  static selectAll = createSelector(
    fleetStatusSubAssetSelector,
    selectAll
  );

  static message = createSelector(
    fleetStatusSubAssetSelector,
    (state) => state
  );

  static error = createSelector(
    fleetStatusSubAssetSelector,
    (state) => state
  );
}
