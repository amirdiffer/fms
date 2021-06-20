import { createSelector } from '@ngrx/store';
import { usersAdapter, UsersState } from './users.entity';
const { selectAll, selectIds, selectEntities } = usersAdapter.getSelectors();
const usersSelector = (state) => state['users'];
export class UsersSelectors {
  static selectAll = createSelector(
    usersSelector,
    selectAll
  );

  static message = createSelector(
    usersSelector,
    (state) => state.message
  );

  static error = createSelector(
    usersSelector,
    (state) => state.error
  );

  static submitted = createSelector(
    usersSelector,
    (state) => state.submitted
  )

  static selectStatistics = createSelector(
    usersSelector,
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
