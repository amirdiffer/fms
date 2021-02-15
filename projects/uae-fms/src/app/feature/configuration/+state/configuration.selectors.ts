import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CONFIGURATION_FEATURE_KEY } from './configuration.entity';

export class ConfigurationSelectors {
  static featureSelector = createFeatureSelector(CONFIGURATION_FEATURE_KEY);

  static rolePermissionSelector = createSelector(
    ConfigurationSelectors.featureSelector,
    (state) => state['rolePermission']
  );

  static assetPolicySelector = createSelector(
    ConfigurationSelectors.featureSelector,
    (state) => state['assetPolicy']
  );

  static usersSelector = createSelector(
    ConfigurationSelectors.featureSelector,
    (state) => state['users']
  );

  static businessCategorySelector = createSelector(
    ConfigurationSelectors.featureSelector,
    (state) => state['businessCategory']
  );

  static fleetStatusAssetSelector = createSelector(
    ConfigurationSelectors.featureSelector,
    (state) => state['fleetStatusAsset']
  );

  static fleetStatusSubAssetSelector = createSelector(
    ConfigurationSelectors.featureSelector,
    (state) => state['fleetStatusSubAsset']
  );

  static ownershipSelector = createSelector(
    ConfigurationSelectors.featureSelector,
    (state) => state['ownershipSelector']
  );

  static periodicServiceSelector = createSelector(
    ConfigurationSelectors.featureSelector,
    (state) => state['periodicService']
  );
}
