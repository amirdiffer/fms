import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../configuration.selectors';
import { usersAdapter } from './users.entity';

export class UsersSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.usersSelector,
    usersAdapter.setAll
  );

  static message = createSelector(
    ConfigurationSelectors.usersSelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.usersSelector,
    (state) => state.error
  );
}
