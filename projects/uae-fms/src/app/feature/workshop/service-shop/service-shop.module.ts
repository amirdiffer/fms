import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceShopRoutingModule } from './service-shop-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { DashboardModule } from '../../dashboard/dashboard.module';
import { FilterModule } from '@core/filter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FilterModule,
    ServiceShopRoutingModule,
    AngularSvgIconModule,
    DashboardModule
  ]
})
export class ServiceShopModule {}
