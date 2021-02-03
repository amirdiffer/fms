import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from '@core/table';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';

import { WorkshopRoutingModule } from './workshop-routing.module';

import { TaskMasterComponent } from './task-master/task-master.component';
import { BodyShopComponent } from './body-shop/body-shop.component';
import { AuctionListComponent } from './inspections/auction-list/auction-list.component';
import { TechnicalInspectionComponent } from './inspections/technical-inspection/technical-inspection.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AddRequestComponent } from './body-shop/add-request/add-request.component';
import { AddTechnicianComponent } from './body-shop/add-technician/add-technician.component';
import { AddLocationComponent } from './body-shop/add-location/add-location.component';
import { DashboardModule } from '@feature/dashboard/dashboard.module';
import { WorkshopStateModule } from './+state';
import { TaskMasterFormComponent } from './task-master-form/task-master-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BodyShopComponent,
    AuctionListComponent,
    TechnicalInspectionComponent,
    TaskMasterComponent,
    AddRequestComponent,
    AddTechnicianComponent,
    AddLocationComponent,
    TaskMasterFormComponent
  ],
  imports: [
    TableModule,
    CommonModule,
    FilterModule,
    TabViewModule,
    WorkshopRoutingModule,
    AngularSvgIconModule,
    SharedModule,
    DashboardModule,
    WorkshopStateModule,
    SharedModule,
    RouterModule
  ]
})
export class WorkshopModule {}
