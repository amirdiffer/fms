import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import {
  Dashboard_FEATURE_KEY,
  dashboardAdapter,
  DashboardPartialState,
  DashboardState
} from './dashboard.entity';

export class DashboardSelectors {
  static featureSelector = createFeatureSelector<
    DashboardPartialState,
    DashboardState
  >(Dashboard_FEATURE_KEY);

  static selectAll = createSelector(
    DashboardSelectors.featureSelector,
    (state) => state.dashboard
  );

  static message = createSelector(
    DashboardSelectors.featureSelector,
    (state) => state.message
  );

  static error = createSelector(
    DashboardSelectors.featureSelector,
    (state) => state.error
  );
}
