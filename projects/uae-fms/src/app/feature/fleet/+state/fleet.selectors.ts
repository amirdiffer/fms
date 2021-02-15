import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FLEET_FEATURE_KEY } from '@feature/fleet/+state/fleet.entity';

export class FleetSelectors {
  static featureSelector = createFeatureSelector(FLEET_FEATURE_KEY);

  static assetMasterSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['assetMaster']
  );

  static customizationSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['customization']
  );

  static registrationSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['registration']
  );

}
