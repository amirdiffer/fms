import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet.component';
import { AssetsComponent } from './assets/assets.component';
import { FilterModule } from '@core/filter/filter.module';
import { TableModule } from '@core/table/table.module';
import { TabViewModule } from '@core/tab-view';
import { OperatorComponent } from './operator/operator.component';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  declarations: [FleetComponent, AssetsComponent, OperatorComponent],
  imports: [
    CommonModule,
    FleetRoutingModule , 
    FilterModule, 
    TableModule ,
    AngularSvgIconModule,
    TabViewModule,
    FontAwesomeModule]
})
export class FleetModule {}
