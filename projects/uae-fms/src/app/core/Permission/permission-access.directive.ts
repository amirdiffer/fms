import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { UserProfileFacade } from '@feature/user/state';
import { Subscription } from 'rxjs';
import { MenuPermission } from './permission.model';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective extends MenuPermission implements OnInit {
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
  ) {
    super();
  }

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
    let hasPermission = false;
    if (
      this._permissions &&
      this._permissions.length > 0 &&
      this._permissions[0].permissionType &&
      this._permissions[0].permissionType === 'MENU'
    ) {
      let parentMenu = this._permissions[0].parent;
      let permissionMenu = this._permissions[0].permission;
      let permissionModel = new MenuPermission();
      if (this._currentUser !== null) {
        if (this._currentUser.roles[0].roleId === 2) {
          permissionModel._dashboardPermission = {
            DASHBOARD: ['DONT_ALLOW'],
            DASHBOARD_TECHNICIAN: ['AlLOW_ALWAYS']
          };
        } else {
          permissionModel._dashboardPermission = {
            DASHBOARD: ['AlLOW_ALWAYS'],
            DASHBOARD_TECHNICIAN: ['DONT_ALLOW']
          };
        }
        this._permissions = permissionModel.checkPermissions(
          parentMenu,
          permissionMenu
        );
      }
    }
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
          return !hasPermission;
        }
      }
    }
    return hasPermission;
  }
}
