import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { CompanySettingComponent } from './company-setting/company-setting.component';
import { AddRoleAndPermissionComponent } from './role-permission/add-role-and-permission/add-role-and-permission.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { PermissionGuard } from '@core/Permission/permission.guard';
import { DeactivateFormGuard } from '@core/Permission/deactivate-form.guard';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['USER_NORMAL_VIEW_LIST', 'USER_NORMAL_ADD']
    }
  },
  {
    path: 'company-setting',
    component: CompanySettingComponent
  },
  {
    path: 'role-permission',
    component: RolePermissionComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['DROLE_VIEW_LIST', 'DROLE_ADD']
    }
  },
  {
    path: 'role-permission/:id',
    component: AddRoleAndPermissionComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['DROLE_VIEW_DETAILS']
    }
  },
  {
    path: 'add-role-permission',
    component: AddRoleAndPermissionComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['DROLE_ADD']
    },
    canDeactivate:[DeactivateFormGuard]
  },
  {
    path: 'edit-role-permission/:id',
    component: AddRoleAndPermissionComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['DROLE_UPDATE']
    },
    canDeactivate:[DeactivateFormGuard]
  },
  {
    path: 'users/add-new-user',
    component: AddUserComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['USER_NORMAL_ADD']
    }
  },
  {
    path: 'users/edit-user/:id',
    component: AddUserComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['USER_NORMAL_UPDATE']
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
