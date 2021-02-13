import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from './../configuration.selectors';
import { fleetStatusAdapter } from './fleet-status.entity';

export class FleetStatusSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.fleetStatusSelector,
    fleetStatusAdapter.setAll
  );

  static message = createSelector(
    ConfigurationSelectors.fleetStatusSelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.fleetStatusSelector,
    (state) => state.error
  );
}
