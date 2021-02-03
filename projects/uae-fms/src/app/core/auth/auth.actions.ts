import { createAction, props } from '@ngrx/store';
import { AuthState } from '@core/auth/auth.models';

export const authLogin = createAction('[Auth] Login');
export const authLogout = createAction('[Auth] Logout');
export const checkAccess = createAction(
  '[Auth] CheckAccess',
  props<{ data: AuthState }>()
);
