import { Directive, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { UserProfileFacade } from "@feature/user/state";
import { Subscription } from "rxjs";
import { MenuPermission } from "./permission.model";


@Directive({
    selector:'[hasPermission]'
})


export class HasPermissionDirective extends MenuPermission implements OnInit {
    
    private _currentUser = null;
    private _permissions =[];
    @Input()
    set hasPermission(val) {
      this._permissions = val;
      this.update();
    }
    constructor (private _elementRef : ElementRef,
                private _templateRef:TemplateRef<any>,
                private _viewContainerRef : ViewContainerRef,
                private _facadeProfile: UserProfileFacade
                ){super()}

    ngOnInit(){
        this._facadeProfile.loadData$.subscribe(
            user => {
                if(user && this._currentUser == null){
                    this._currentUser = user;
                    this.update();
                }
            }
        );
    }
    private update(){
        if (this.checkPermission()) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        } else {
          this._viewContainerRef.clear();
        }
    }
    public checkPermission() {
        let hasPermission = false;
        if( this._permissions && this._permissions.length > 0  && this._permissions[0].permissionType && this._permissions[0].permissionType === "MENU" ){
            this._permissions = this.checkPermissions(this._permissions[0].parent , this._permissions[0].permission)
        }
        if (this._currentUser && this._currentUser.roles[0].permissions) {
          for (const checkPermission of this._permissions) {
            const permissionFound = this._currentUser.roles[0].permissions.find(x => x.toUpperCase() === checkPermission.toUpperCase());
            if(permissionFound || checkPermission === 'AlLOW_ALWAYS'){
                return !hasPermission;
            }
          }
        }
        return hasPermission;
    }
}


