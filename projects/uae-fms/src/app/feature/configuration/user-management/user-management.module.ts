import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from '@core/table';
import { FilterModule } from '@core/filter';

import { UsersComponent } from './users/users.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { CompanySettingComponent } from './company-setting/company-setting.component';
import { AddRoleAndPermissionComponent } from './role-permission/add-role-and-permission/add-role-and-permission.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { SharedModule } from '@shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlertDialogModule } from '@core/alert-dialog/alert-dialog.module';
import { MatTabsModule } from '@angular/material/tabs';
import { OrganizationStateModule } from '@feature/fleet/+state/organization/organization-state.module';
import { UsersStateModule } from '../+state/users/users-state.module';
import { RolePermissionStateModule } from '../+state/role-permission/role-permission-state.module';
import { AssetConfigurationStateModule } from '../+state/asset-configuration/asset-configuration-state.module';
import { BusinessCategoryStateModule } from '../+state/business-category/business-category-state.module';

@NgModule({
  declarations: [
    UsersComponent,
    RolePermissionComponent,
    CompanySettingComponent,
    AddRoleAndPermissionComponent,
    AddUserComponent
  ],
  imports: [
    TableModule,
    CommonModule,
    FilterModule,
    UserManagementRoutingModule,
    SharedModule,
    MatProgressBarModule,
    AlertDialogModule,
    MatTabsModule,
    UsersStateModule,
    RolePermissionStateModule,
    MatTabsModule,
    OrganizationStateModule,
    AssetConfigurationStateModule,
    BusinessCategoryStateModule
  ]
})
export class UserManagementModule {}
