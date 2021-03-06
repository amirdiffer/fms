import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { DashboardModule } from '@feature/dashboard/dashboard.module';
import { AssetMasterStateModule } from '@feature/fleet/+state/assets/asset-master/asset-master-state.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    AssetMasterStateModule,
    DashboardModule,
  ]
})
export class ConfigurationModule {}
