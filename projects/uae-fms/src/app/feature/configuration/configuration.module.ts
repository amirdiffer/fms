import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { OwnershipComponent } from './ownership/ownership.component';
import { TableModule } from '@core/table';

@NgModule({
  declarations: [ConfigurationComponent, OwnershipComponent],
  imports: [CommonModule, ConfigurationRoutingModule, TableModule]
})
export class ConfigurationModule {}
