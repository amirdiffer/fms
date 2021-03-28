import { Action, createReducer, on } from '@ngrx/store';
import { initialState, usersAdapter, UsersState } from './users.entity';
import { UsersActions } from './users.actions';
import { state } from '@angular/animations';

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
  on(UsersActions.addUser, (state, { data: IUser }) => ({
    ...state,
    submitted: false
  })),
  on(UsersActions.userAddedSuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  })),
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
  })),
  on(UsersActions.resetParams, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(UsersActions.editUser, (state, { user }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(UsersActions.userEditedSuccessfully, (state, { user }) =>
    usersAdapter.updateOne(
      { changes: user, id: user.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  )
);

export function reducer(state: UsersState, action: Action) {
  return usersReducer(state, action);
}
