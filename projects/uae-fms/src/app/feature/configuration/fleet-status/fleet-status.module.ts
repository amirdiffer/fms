import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { FilterModule } from '@core/filter';
import { FleetStatusComponent } from './fleet-status.component';
import { AddFleetStatusComponent } from './add-fleet-status/add-fleet-status.component';
import { FleetStatusRoutingModule } from './fleet-status-routing.module';
import { TabViewModule } from '@core/tab-view';
import { FleetStatusAssetStateModule } from '@feature/configuration/+state/fleet-status/asset/fleet-status-asset-state.module';
import { FleetStatusSubAssetStateModule } from '@feature/configuration/+state/fleet-status/sub-asset/fleet-status-sub-asset-state.module';



@NgModule({
  declarations: [FleetStatusComponent , AddFleetStatusComponent],
  imports: [
    CommonModule,
    FleetStatusRoutingModule,
    SharedModule,
    TableModule,
    FilterModule,
    TabViewModule,
    FleetStatusAssetStateModule,
    FleetStatusSubAssetStateModule
  ]
})
export class FleetStatusModule { }
