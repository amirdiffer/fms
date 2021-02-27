import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyShopRoutingModule } from './body-shop-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { DashboardModule } from '../../dashboard/dashboard.module';
import { FilterModule } from "@core/filter";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FilterModule,
    BodyShopRoutingModule,
    AngularSvgIconModule,
    DashboardModule
  ]
})
export class BodyShopModule { }
