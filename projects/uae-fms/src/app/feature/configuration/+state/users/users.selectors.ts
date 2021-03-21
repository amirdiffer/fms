import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../configuration.selectors';
import { usersAdapter, UsersState } from './users.entity';
const { selectAll } = usersAdapter.getSelectors();

export class UsersSelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.usersSelector,
    selectAll
  );

  static message = createSelector(
    ConfigurationSelectors.usersSelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.usersSelector,
    (state) => state.error
  );
  static selectStatistics = createSelector(
    ConfigurationSelectors.usersSelector,
    (state) => state.statistics
  );
}
