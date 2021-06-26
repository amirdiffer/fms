import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { UserProfileFacade } from '@feature/user/state';


@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective  implements OnInit {
  private _currentUser = null;
  private _permissions = [];
  @Input()
  set hasPermission(val) {
    this._permissions = val;
    this.update();
  }
  constructor(
    private _elementRef: ElementRef,
    private _templateRef: TemplateRef<any>,
    private _viewContainerRef: ViewContainerRef,
    private _facadeProfile: UserProfileFacade
  ) {}

  ngOnInit() {
    this._facadeProfile.loadData$.subscribe((user) => {
      if (user && this._currentUser == null) {
        
        this._currentUser = user;
        this.update();
      }
    });
  }
  private update() {
    if (this.checkPermission()) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainerRef.clear();
    }
  }
  public checkPermission() {
    if (
      this._currentUser !== null &&
      this._currentUser.roles[0].permissions &&
      this._permissions &&
      this._permissions.length > 0
    ) {
      for (const checkPermission of this._permissions) {
        const permissionFound = this._currentUser.roles[0].permissions.find(
          (x) => x.toUpperCase() === checkPermission.toUpperCase()
        );
        if (permissionFound || checkPermission === 'AlLOW_ALWAYS') {
          return !this.hasPermission;
        }
      }
    }
    return this.hasPermission;
  }
}
