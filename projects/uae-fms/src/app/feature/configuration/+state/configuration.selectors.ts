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
}
