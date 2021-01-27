import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { PeriodicServiceComponent } from '@feature/configuration/periodic-service/periodic-service.component';
import { TableModule } from "@core/table";

@NgModule({
  declarations: [
    ConfigurationComponent,
    PeriodicServiceComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    TableModule
  ]
})
export class ConfigurationModule { }
