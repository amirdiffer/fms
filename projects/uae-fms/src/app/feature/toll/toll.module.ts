import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from '@core/table/table.module';
import { FilterModule } from '@core/filter/filter.module';

import { TollComponent } from './toll.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TollRoutingModule } from './toll-routing.module';
import { AddTollComponent } from './add-toll/add-toll.component';
import { DashboardModule } from '@feature/dashboard/dashboard.module';

@NgModule({
  declarations: [TollComponent, AddTollComponent],
  imports: [
    TableModule,
    FilterModule,
    CommonModule,
    TollRoutingModule,
    AngularSvgIconModule,
    DashboardModule
  ]
})
export class TollModule {}
