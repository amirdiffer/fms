import { AuthState } from './auth.models';
import { authLogin, authLogout, checkAccess } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false
};

const reducer = createReducer(
  initialState,
  on(authLogin, (state) => ({ ...state, isAuthenticated: true })),
  on(authLogout, (state) => ({ ...state, isAuthenticated: false })),
  on(checkAccess, (state, { data }) => ({
    ...state,
    ...data
  }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return <AuthState>reducer(state, action);
}
