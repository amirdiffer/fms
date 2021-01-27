import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { AssetPolicyComponent } from './asset-policy/asset-policy.component';
import { TableModule } from '@core/table';
import { TabViewModule } from '@core/tab-view';
import { PeriodicServiceComponent } from '@feature/configuration/periodic-service/periodic-service.component';

@NgModule({
  declarations: [
    ConfigurationComponent,
    PeriodicServiceComponent,
    AssetPolicyComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    TableModule,
    TabViewModule
  ]
})
export class ConfigurationModule { }
