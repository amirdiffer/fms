import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { FilterModule } from '@core/filter';
import { FleetStatusComponent } from './fleet-status.component';
import { AddFleetStatusComponent } from './add-fleet-status/add-fleet-status.component';
import { FleetStatusRoutingModule } from './fleet-status-routing.module';
import { TabViewModule } from '@core/tab-view';



@NgModule({
  declarations: [FleetStatusComponent , AddFleetStatusComponent],
  imports: [
    CommonModule,
    FleetStatusRoutingModule,
    SharedModule,
    TableModule,
    FilterModule,
    TabViewModule
  ]
})
export class FleetStatusModule { }
