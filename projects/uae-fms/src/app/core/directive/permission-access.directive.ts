import { Directive, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { UserProfileFacade } from "@feature/user/state";
import { Subscription } from "rxjs";


@Directive({
    selector:'[hasPermission]'
})


export class HasPermissionDirective implements OnInit{

    private _currentUser;
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
                ){}

    ngOnInit(){
        this._facadeProfile.loadData$.subscribe(
            user => {
                if(user){
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
    private checkPermission() {
        let hasPermission = false;
        if (this._currentUser && this._currentUser.roles[0].permissions) {
          for (const checkPermission of this._permissions) {
            const permissionFound = this._currentUser.roles[0].permissions.find(x => x.toUpperCase() === checkPermission.toUpperCase());
            if(permissionFound){
                return !hasPermission;
            }
          }
        }
        return hasPermission;
    }
}