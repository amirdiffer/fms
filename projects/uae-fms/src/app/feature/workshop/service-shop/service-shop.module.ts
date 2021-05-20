import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceShopRoutingModule } from './service-shop-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { DashboardModule } from '../../dashboard/dashboard.module';
import { FilterModule } from '@core/filter';
import { UserProfileModule } from '@feature/user/user.module';
import { TabViewModule } from '@core/tab-view';
import { FleetModule } from '@feature/fleet/fleet.module';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { MapModule } from '@core/map-view';
import { RequestTabOverviewServiceShopComponent } from './request-tab-overview/request-tab-overview.component';
import { TechnicianOverviewServiceShopComponent } from './technician-overview/technician-overview.component';
import { JobCardOverviewComponent } from "./job-card-overview/job-card-overview.component";

@NgModule({
  declarations: [RequestTabOverviewServiceShopComponent, TechnicianOverviewServiceShopComponent, JobCardOverviewComponent],
  imports: [
    CommonModule,
    FilterModule,
    ServiceShopRoutingModule,
    AngularSvgIconModule,
    DashboardModule,
    SharedModule,
    TableModule,
    MapModule,
    TabViewModule,
    UserProfileModule,
    FleetModule,
  ]
})
export class ServiceShopModule { }
