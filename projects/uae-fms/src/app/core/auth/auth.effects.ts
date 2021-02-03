import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import { authLogin, authLogout, checkAccess } from './auth.actions';
import { AuthState } from '@core/auth/auth.models';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin),
        tap(() =>
          this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true })
        )
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this.router.navigate(['']);
          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: false
          });
        })
      ),
    { dispatch: false }
  );

  checkAccess = createEffect(() => this.actions$.pipe(ofType(checkAccess)), {
    dispatch: false
  });

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
}
