import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INTEGRATION_FEATURE_KEY,
  integrationAdapter,
  IntegrationState
} from './integration.entity';
const { selectAll } = integrationAdapter.getSelectors();

export class IntegrationSelectors {
  static integrationSelector = createFeatureSelector<IntegrationState>(
    INTEGRATION_FEATURE_KEY
  );

  static selectAll = createSelector(
    IntegrationSelectors.integrationSelector,
    selectAll
  );

  static message = createSelector(
    IntegrationSelectors.integrationSelector,
    (state) => state.message
  );

  static error = createSelector(
    IntegrationSelectors.integrationSelector,
    (state) => state.error
  );
}
