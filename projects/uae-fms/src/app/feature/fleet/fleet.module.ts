import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GMapModule } from 'primeng/gmap';
import { CardModule } from 'primeng/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FleetRoutingModule } from './fleet-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ConfigurationStateModule } from '@feature/configuration/+state';


@NgModule({
  declarations: [],
  imports: [
    FleetRoutingModule,
    CommonModule,
    DashboardModule,
    GMapModule,
    CardModule,
    NgApexchartsModule,
    ConfigurationStateModule
    
  ],
})
export class FleetModule {}
