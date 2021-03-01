import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../../configuration.selectors';
import { fleetStatusSubAssetAdapter } from './fleet-status-sub-asset.entity';
const { selectAll } = fleetStatusSubAssetAdapter.getSelectors();

export class FleetStatusSubAssetSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.fleetStatusSubAssetSelector,
    selectAll
  );

  static message = createSelector(
    ConfigurationSelectors.fleetStatusSubAssetSelector,
    (state) => state
  );

  static error = createSelector(
    ConfigurationSelectors.fleetStatusSubAssetSelector,
    (state) => state
  );
}
