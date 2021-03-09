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
    loaded: false
  })),
  on(UsersActions.userAddedSuccessfully, (state, { data }) =>
    usersAdapter.addOne(data, state)
  ),
  on(UsersActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: UsersState, action: Action) {
  return usersReducer(state, action);
}
