import { createSelector } from '@ngrx/store';
import { ownershipAdapter } from './ownership.entity';

const { selectAll } = ownershipAdapter.getSelectors();
const ownershipSelector = (state) => state['ownership'];

export class OwnershipSelectors {
  static selectAll = createSelector(ownershipSelector, selectAll);

  static message = createSelector(ownershipSelector, (state) => state.message);

  static error = createSelector(ownershipSelector, (state) => state.error);

  static submitted = createSelector(
    ownershipSelector,
    (state) => state.submitted
  );

  static loaded = createSelector(
    ConfigurationSelectors.ownershipSelector,
    (state) => state.loaded
  );
}
