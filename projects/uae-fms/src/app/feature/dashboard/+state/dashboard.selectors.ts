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
    (state) => state
  );

  static message = createSelector(
    DashboardSelectors.featureSelector,
    (state) => state.message
  );

  static error = createSelector(
    DashboardSelectors.featureSelector,
    (state) => state.error
  );

  static activeAssets = createSelector(
    DashboardSelectors.featureSelector,
    (state) => state.activeAssets
  );

  static assetStatus = createSelector(
    DashboardSelectors.featureSelector,
    (state) => state.assetStatus
  );

  static businessCategory = createSelector(
    DashboardSelectors.featureSelector,
    (state) => state.businessCategory
  );

  static factoryCategory = createSelector(
    DashboardSelectors.featureSelector,
    (state) => state.factoryCategory
  );

  static suppliers = createSelector(
    DashboardSelectors.featureSelector,
    (state) => state.suppliers
  );
}
