import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from '@core/table';
import { FilterModule } from '@core/filter';

import { UsersComponent } from './users/users.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { CompanySettingComponent } from './company-setting/company-setting.component';

@NgModule({
  declarations: [
    UsersComponent,
    RolePermissionComponent,
    CompanySettingComponent
  ],
  imports: [
    TableModule,
    CommonModule,
    FilterModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule {}
