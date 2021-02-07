import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../configuration.selectors';
import { ownershipAdapter } from './ownership.entity';

export class OwnershipSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.ownershipSelector,
    ownershipAdapter.setAll
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
