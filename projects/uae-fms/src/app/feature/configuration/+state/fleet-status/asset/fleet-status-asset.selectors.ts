import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../../configuration.selectors';
import { fleetStatusAssetAdapter } from './fleet-status-asset.entity';

export class FleetStatusAssetSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.fleetStatusAssetSelector,
    fleetStatusAssetAdapter.setAll
  );

  static message = createSelector(
    ConfigurationSelectors.fleetStatusAssetSelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.fleetStatusAssetSelector,
    (state) => state.error
  );
}
