import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../configuration.selectors';
import { periodicServiceAdapter } from './periodic-service.entity';
const { selectAll } = periodicServiceAdapter.getSelectors();

export class PeriodicServiceSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.periodicServiceSelector,
    selectAll
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
