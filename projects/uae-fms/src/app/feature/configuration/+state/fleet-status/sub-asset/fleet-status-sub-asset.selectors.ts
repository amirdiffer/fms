import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../../configuration.selectors';
import { fleetStatusSubAssetAdapter } from './fleet-status-sub-asset.entity';

export class FleetStatusSubAssetSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.fleetStatusSubAssetSelector,
    fleetStatusSubAssetAdapter.setAll
  );

  static message = createSelector(
    ConfigurationSelectors.fleetStatusSubAssetSelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.fleetStatusSubAssetSelector,
    (state) => state.error
  );
}
