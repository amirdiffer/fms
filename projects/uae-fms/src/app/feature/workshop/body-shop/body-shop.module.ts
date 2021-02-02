import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyShopRoutingModule } from './body-shop-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { DashboardModule } from '../../dashboard/dashboard.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BodyShopRoutingModule,
    AngularSvgIconModule,
    DashboardModule
  ]
})
export class BodyShopModule {}
