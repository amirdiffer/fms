import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INTEGRATION_FEATURE_KEY,
  integrationAdapter
} from './integration.entity';

export class IntegrationSelectors {
  static tollSelector = createSelector(
    createFeatureSelector(INTEGRATION_FEATURE_KEY),
    (state) => state['integration']
  );

  static selectAll = createSelector(
    IntegrationSelectors.tollSelector,
    integrationAdapter.setAll
  );

  static message = createSelector(
    IntegrationSelectors.tollSelector,
    (state) => state.message
  );

  static error = createSelector(
    IntegrationSelectors.tollSelector,
    (state) => state.error
  );
}
