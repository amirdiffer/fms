import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationStateModule } from './+state';
import { FleetStateModule } from '../fleet/+state/fleet.state.module';
import { DashboardModule } from '@feature/dashboard/dashboard.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigurationStateModule,
    ConfigurationRoutingModule,
    FleetStateModule,
    DashboardModule
  ]
})
export class ConfigurationModule {}
