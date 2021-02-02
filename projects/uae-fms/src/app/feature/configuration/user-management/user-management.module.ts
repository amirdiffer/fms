import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { TableModule } from '@core/table';
import { UsersComponent } from './users/users.component';
import { FilterModule } from '@core/filter';
import { CompanySettingComponent } from './company-setting/company-setting.component';
import { AddRoleAndPermissionComponent } from './role-permission/add-role-and-permission/add-role-and-permission.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './users/add-user/add-user.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    RolePermissionComponent,
    UsersComponent,
    CompanySettingComponent,
    AddRoleAndPermissionComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    TableModule,
    FilterModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    AngularSvgIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ]
})
export class UserManagementModule {}
