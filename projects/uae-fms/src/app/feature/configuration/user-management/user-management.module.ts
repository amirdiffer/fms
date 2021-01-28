import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { TableModule } from '@core/table';
import { UsersComponent } from './users/users.component';
import { FilterModule } from '@core/filter';
import { CompanySettingComponent } from './company-setting/company-setting.component';

@NgModule({
  declarations: [
    RolePermissionComponent,
    UsersComponent,
    CompanySettingComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    TableModule,
    FilterModule
  ]
})
export class UserManagementModule {}
