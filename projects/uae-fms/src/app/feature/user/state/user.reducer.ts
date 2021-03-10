import { createReducer, on, Action } from '@ngrx/store';
import { UserPorfileAction } from './user.action';
import {
  initialState,
  IUserProfileState,
  userProfileAdapter
} from './user.entity';

const userProfileReducer = createReducer(
  initialState,
  on(UserPorfileAction.loadData, (state) => ({
    ...state,
    loaded: false,
    error: null,
    profile: null
  })),
  on(UserPorfileAction.dataLoaded, (state, { data }) => ({
      ...state,
      loaded: true,
      error: null,
      profile: data,
    })
  ),
  on(UserPorfileAction.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: IUserProfileState, action: Action) {
  return userProfileReducer(state, action);
}
