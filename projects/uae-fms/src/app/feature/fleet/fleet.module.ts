import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet.component';
import { AccessoryComponent } from './accessory/accessory.component';
import { OperatorComponent } from './operator/operator.component';
import { FilterModule } from '@core/filter/filter.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableModule } from '@core/table';

@NgModule({
  declarations: [FleetComponent, AccessoryComponent, OperatorComponent],
  imports: [
    CommonModule,
    FleetRoutingModule,
    FilterModule,
    AngularSvgIconModule,
    TableModule
  ]
})
export class FleetModule {}
