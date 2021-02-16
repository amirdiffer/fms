import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRAFFIC_FINES_FEATURE_KEY } from './traffic-fines.entity';

export class TrafficFinesSelectors {
  static featureSelector = createFeatureSelector(TRAFFIC_FINES_FEATURE_KEY);

  static trafficFineTableSelector = createSelector(
    TrafficFinesSelectors.featureSelector,
    (state) => state['trafficFineTable']
  );

  static assetTrafficFineSelector = createSelector(
    TrafficFinesSelectors.featureSelector,
    (state) => state['assetTrafficFine']
  )
}
