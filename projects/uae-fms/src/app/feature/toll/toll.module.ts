import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TollComponent } from './toll.component';
import { TollRoutingModule } from './toll-routing.module';
import { TableModule } from '@core/table/table.module';
import { FilterModule } from '@core/filter/filter.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
@NgModule({
  declarations: [TollComponent],
  imports: [
    CommonModule,
    TollRoutingModule,
    TableModule,
    FilterModule,
    AngularSvgIconModule
  ]
})
export class TollModule {}
