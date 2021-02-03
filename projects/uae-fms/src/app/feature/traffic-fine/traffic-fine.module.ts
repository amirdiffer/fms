import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { TableModule } from '@core/table';
import { TabViewModule } from '@core/tab-view';
import { FilterModule } from '@core/filter/filter.module';
import { TrafficFineComponent } from '@feature/traffic-fine/traffic-fine.component';

import { TrafficFineRoutingModule } from './traffic-fine-routing.module';

@NgModule({
  declarations: [TrafficFineComponent],
  imports: [
    TableModule,
    FilterModule,
    CommonModule,
    TabViewModule,
    AngularSvgIconModule,
    TrafficFineRoutingModule
  ]
})
export class TrafficFineModule {}
