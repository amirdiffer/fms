import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../configuration.selectors';
import { periodicServiceAdapter } from './periodic-service.entity';

export class PeriodicServiceSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.periodicServiceSelector,
    periodicServiceAdapter.setAll
  );

  static message = createSelector(
    ConfigurationSelectors.periodicServiceSelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.periodicServiceSelector,
    (state) => state.error
  );
}
