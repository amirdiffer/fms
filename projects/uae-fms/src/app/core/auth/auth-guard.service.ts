import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  Router,
  UrlSegment
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { selectIsAuthenticated } from './auth.selectors';
import { AppState } from '../core.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {
  constructor(private store: Store<AppState>, private router: Router) { }

  // canActivate(): Observable<boolean> {
  //   return this.store.pipe(select(selectIsAuthenticated));
  // }
  canLoad(route: Route, segments: UrlSegment[]) {
    if (window.localStorage.getItem('jwt')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  canActivate(): Observable<boolean> {
    return of(true);
    // return this.store.pipe(select(selectIsAuthenticated));
  }
}
