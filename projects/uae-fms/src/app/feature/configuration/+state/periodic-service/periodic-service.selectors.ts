import { createSelector } from '@ngrx/store';
import { periodicServiceAdapter } from './periodic-service.entity';

const { selectAll } = periodicServiceAdapter.getSelectors();
const periodicServiceSelector = (state) => state['periodic-service'];
export class PeriodicServiceSelectors {
  static selectAll = createSelector(periodicServiceSelector, selectAll);

  static message = createSelector(
    periodicServiceSelector,
    (state) => state.message
  );

  static error = createSelector(
    periodicServiceSelector,
    (state) => state.error
  );

  static submitted = createSelector(
    periodicServiceSelector,
    (state) => state.submitted
  );

  static specificPeriodicService = createSelector(
    periodicServiceSelector,
    (state) => state.specificPeriodicService
  );

  static loaded = createSelector(
    periodicServiceSelector,
    (state) => state.loaded
  );
}
