import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolePermissionComponent } from '@feature/configuration/user-management/role-permission/role-permission.component';
import { UsersComponent } from '@feature/configuration/user-management/users/users.component';
import { CompanySettingComponent } from '@feature/configuration/user-management/company-setting/company-setting.component';
import { AddRoleAndPermissionComponent } from '@feature/configuration/user-management/role-permission/add-role-and-permission/add-role-and-permission.component';
import { AddUserComponent } from '@feature/configuration/user-management/users/add-user/add-user.component';

const routes: Routes = [
  { path: 'role-permission', component: RolePermissionComponent },
  { path: 'add-role-permission', component: AddRoleAndPermissionComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'company-setting', component: CompanySettingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
