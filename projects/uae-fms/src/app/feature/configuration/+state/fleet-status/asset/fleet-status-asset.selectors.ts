import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../../configuration.selectors';
import { fleetStatusAssetAdapter } from './fleet-status-asset.entity';
const { selectAll } = fleetStatusAssetAdapter.getSelectors();

export class FleetStatusAssetSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.fleetStatusAssetSelector,
    selectAll
  );

  static message = createSelector(
    ConfigurationSelectors.fleetStatusAssetSelector,
    (state) => state
  );

  static error = createSelector(
    ConfigurationSelectors.fleetStatusAssetSelector,
    (state) => state
  );
}
