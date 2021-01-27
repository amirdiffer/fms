import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from '@core/table';
import { FleetStatusComponent } from './fleet-status/fleet-status.component';
import { TabViewModule } from '@core/tab-view';
import { FleetStatusAssetTableComponent } from './fleet-status/fleet-status-table/fleet-status-asset-table.component';

@NgModule({
  declarations: [
    ConfigurationComponent,
    FleetStatusComponent,
    FleetStatusAssetTableComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    FontAwesomeModule,
    TableModule,
    TabViewModule
  ]
})
export class ConfigurationModule {}
