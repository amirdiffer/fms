import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../configuration.selectors';
import { usersAdapter, UsersState } from './users.entity';
const { selectAll, selectIds, selectEntities } = usersAdapter.getSelectors();

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

  static submitted = createSelector(
    ConfigurationSelectors.usersSelector,
    (state) => state.submitted
  )

  static selectStatistics = createSelector(
    ConfigurationSelectors.usersSelector,
    (state) => state.statistics
  );

  static selectById = createSelector(
    UsersSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter(x => x.id == props.id)
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
