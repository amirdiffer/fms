import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet.component';
import { SubAssetComponent } from './sub-asset/sub-asset.component';
import { TableModule } from '@core/table';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FilterModule } from '@core/filter/filter.module';
import { OperatorComponent } from '@feature/fleet/operator/operator.component';

@NgModule({
  declarations: [FleetComponent, OperatorComponent, SubAssetComponent],
  imports: [
    CommonModule,
    FleetRoutingModule,
    FilterModule,
    AngularSvgIconModule,
    TableModule
  ]
})
export class FleetModule {}
