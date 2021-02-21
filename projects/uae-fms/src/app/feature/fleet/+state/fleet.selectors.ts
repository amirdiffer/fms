import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FLEET_FEATURE_KEY } from './fleet.entity';

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

  static movementOverviewSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['movementOverview']
  );
  static movementRequestsSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['movementRequests']
  );
  static organizationSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['organization']
  );
}
