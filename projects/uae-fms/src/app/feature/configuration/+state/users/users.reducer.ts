import { Action, createReducer, on } from '@ngrx/store';
import { initialState, usersAdapter, UsersState } from './users.entity';
import { UsersActions } from './users.actions';

const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(UsersActions.allDataLoaded, (state, { data }) =>
    usersAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(UsersActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(UsersActions.loadStatistics, (state) => ({
    ...state,
    loaded: false
  })),
  on(UsersActions.statisticsLoaded, (state, { data }) => ({
    ...state,
    statistics: data
  }))
);

export function reducer(state: UsersState, action: Action) {
  return usersReducer(state, action);
}
