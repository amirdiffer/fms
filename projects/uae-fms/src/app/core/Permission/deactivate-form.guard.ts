import { Injectable, Input } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DialogService , DialogTemplateComponent } from '@core/dialog/dialog-template.component';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeactivateFormGuard implements CanDeactivate<hasPermission> {
  @Input() dialogComponent : DialogTemplateComponent
  constructor(private _dialogService : DialogService){}
  canDeactivate(
    component: hasPermission,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
      this._dialogService.show('warning' , 'Are you sure you want to leave?' , 'You have unsaved changes! If you leave, your changes will be lost.' , 'Ok','Cancel');
      if(this._dialogService.dialogClosed$){
        return this._dialogService.dialogClosed$.pipe(map(
          x=> {
            if(x){
              if(x =='confirm'){
                return true
              }else{
                return false
              }
            }
          }
        ))
      }
    }
}



export interface hasPermission {
  confirm(): boolean
}