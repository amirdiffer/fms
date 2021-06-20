import { createSelector } from '@ngrx/store';
import { fleetStatusAssetAdapter } from './fleet-status-asset.entity';

const { selectAll } = fleetStatusAssetAdapter.getSelectors();
const fleetStatusAssetSelector = (state) => state['fleetStatusAsset'];
export class FleetStatusAssetSelectors {
  static selectAll = createSelector(
    fleetStatusAssetSelector,
    selectAll
  );

  static message = createSelector(
    fleetStatusAssetSelector,
    (state) => state
  );

  static error = createSelector(
    fleetStatusAssetSelector,
    (state) => state
  );
}
