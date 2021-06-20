import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { UserProfileFacade } from '@feature/user/state';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _facadeProfile: UserProfileFacade
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let userRoles;
    this._facadeProfile.loadData$.subscribe((user) => {
      if (user) {
        userRoles = user.roles[0].permissions;
      }
    });
    const permission = route.data['permission'];
    let canActivate: Observable<boolean> = of(true);

    if (userRoles && permission) {
      for (const checkPermission of permission) {
        const permissionFound = userRoles.find(
          (x) => x.toUpperCase() === checkPermission.toUpperCase()
        );
        if (permissionFound || checkPermission === 'AlLOW_ALWAYS') {
          canActivate = of(true);
          break;
        } else {
          canActivate = of(false);
        }
      }
    }
    return canActivate.pipe(map((x) => x));
  }
}
