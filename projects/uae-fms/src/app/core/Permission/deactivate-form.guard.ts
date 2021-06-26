import { Injectable, Input } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService , DialogTemplateComponent } from '@core/dialog/dialog-template.component';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DeactivateFormGuard implements CanDeactivate<hasPermission> {
  @Input() dialogComponent : DialogTemplateComponent
  constructor(private _dialogService : DialogService , private _dialog: MatDialog){}
  canDeactivate(
    component: hasPermission,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{
      if(this._dialog.openDialogs.length < 1){
        const dialog = this._dialogService.show('warning' , 'Are you sure you want to leave?' , 'You have unsaved changes! If you leave, your changes will be lost.' , 'Ok','Cancel');
        const dialogClose$:Observable<boolean> = dialog.dialogClosed$.pipe(map(
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
        return dialogClose$
      }else{
        return true;
      }
    }
}



export interface hasPermission {
  confirm(): boolean
}