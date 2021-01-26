import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet.component';
import { OperatorComponent } from './operator/operator.component';
import { FilterModule } from '@core/filter/filter.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableModule } from '@core/table';
import { OrganizationComponent } from './organization/organization.component';

@NgModule({
  declarations: [FleetComponent, OperatorComponent, OrganizationComponent],
  imports: [
    CommonModule,
    FleetRoutingModule,
    FilterModule,
    AngularSvgIconModule,
    TableModule
  ]
})
export class FleetModule {}
