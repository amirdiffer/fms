import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeactivateFormGuard implements CanDeactivate<hasPermission> {
  canDeactivate(
    component: hasPermission,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(!component.confirm()) {
        if (confirm('You have unsaved changes! If you leave, your changes will be lost.')) {
        return true;
        } else {
          return false;
        }
      }
    }
}



export interface hasPermission {
  confirm(): boolean
}