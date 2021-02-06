import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { CompanySettingComponent } from './company-setting/company-setting.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'company-setting', component: CompanySettingComponent },
  { path: 'role-permission', component: RolePermissionComponent },
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
