import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrafficFineRoutingModule } from './traffic-fine-routing.module';
import { TrafficFineComponent } from '@feature/traffic-fine/traffic-fine.component';
import { TableModule } from '@core/table';
import { TabViewModule } from '@core/tab-view';
import { FilterModule } from '@core/filter/filter.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [TrafficFineComponent],
  imports: [
    CommonModule,
    TrafficFineRoutingModule,
    TableModule,
    TabViewModule,
    FilterModule,
    AngularSvgIconModule
  ]
})
export class TrafficFineModule {}
