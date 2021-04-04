import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { CompanySettingComponent } from './company-setting/company-setting.component';
import { AddRoleAndPermissionComponent } from './role-permission/add-role-and-permission/add-role-and-permission.component';
import { AddUserComponent } from './users/add-user/add-user.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'company-setting', component: CompanySettingComponent },
  // { path: 'role-permission', component: RolePermissionComponent },
  // { path: 'add-role-permission', component: AddRoleAndPermissionComponent },
  { path: 'users/add-new-user', component: AddUserComponent },
  { path: 'users/edit-user/:id', component: AddUserComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'role-permission'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
