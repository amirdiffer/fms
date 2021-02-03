import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from '@core/table/table.module';
import { FilterModule } from '@core/filter/filter.module';

import { TollComponent } from './toll.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TollRoutingModule } from './toll-routing.module';

@NgModule({
  declarations: [TollComponent],
  imports: [
    TableModule,
    FilterModule,
    CommonModule,
    TollRoutingModule,
    AngularSvgIconModule
  ]
})
export class TollModule {}
