import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../configuration.selectors';
import { ownershipAdapter } from './ownership.entity';
const { selectAll } = ownershipAdapter.getSelectors();

export class OwnershipSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.ownershipSelector,
    selectAll
  );

  static message = createSelector(
    ConfigurationSelectors.ownershipSelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.ownershipSelector,
    (state) => state.error
  );
}
