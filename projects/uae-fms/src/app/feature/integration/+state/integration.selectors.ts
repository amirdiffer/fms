import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INTEGRATION_FEATURE_KEY,
  integrationAdapter
} from './integration.entity';
const { selectAll } = integrationAdapter.getSelectors();

export class IntegrationSelectors {
  static integrationSelector = createSelector(
    createFeatureSelector(INTEGRATION_FEATURE_KEY),
    (state) => state
  );

  static selectAll = createSelector(
    IntegrationSelectors.integrationSelector,
    selectAll
  );

  static message = createSelector(
    IntegrationSelectors.integrationSelector,
    (state) => state['message']
  );

  static error = createSelector(
    IntegrationSelectors.integrationSelector,
    (state) => state['error']
  );
}
