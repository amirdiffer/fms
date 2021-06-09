import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterModule } from '@core/filter';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { OrganizationComponent } from './organization.component';
import { DepartmentOverviewComponent } from './department-overview/department-overview.component';
import { OverviewTabComponent } from './department-overview/overview-tab/overview-tab.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { TabViewModule } from '@core/tab-view';

@NgModule({
  declarations: [
    OrganizationComponent,
    AddOrganizationComponent,
    DepartmentOverviewComponent,
    OverviewTabComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    FilterModule,
    TableModule,
    TabViewModule,
    SharedModule
  ]
})
export class OrganizationModule {}
