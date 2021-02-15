import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FLEET_FEATURE_KEY } from './fleet.entity';

export class FleetSelectors {
  static featureSelector = createFeatureSelector(FLEET_FEATURE_KEY);

  static movementOverviewSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['movementOverview']
  );
  static movementRequestsSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['movementOverview']
  );
}
