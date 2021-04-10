import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyShopRoutingModule } from './body-shop-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { DashboardModule } from '../../dashboard/dashboard.module';
import { FilterModule } from '@core/filter';
import { RequestTabOverviewComponent } from '../body-shop/request-tab-overview/request-tab-overview.component';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { MapModule } from '@core/map-view';
import { TechnicianOverviewComponent } from './technician-overview/technician-overview.component';
import { UserProfileModule } from '@feature/user/user.module';
import { TabViewModule } from '@core/tab-view';

@NgModule({
  declarations: [RequestTabOverviewComponent, TechnicianOverviewComponent],
  imports: [
    CommonModule,
    FilterModule,
    BodyShopRoutingModule,
    AngularSvgIconModule,
    DashboardModule,
    SharedModule,
    TableModule,
    MapModule,
    TabViewModule,
    UserProfileModule
  ]
})
export class BodyShopModule {}
