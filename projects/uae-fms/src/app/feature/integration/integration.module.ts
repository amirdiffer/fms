import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './integration.component';
import { TableModule } from '@core/table';
import { AddIntegrationComponent } from './add-integration/add-integration.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [IntegrationComponent, AddIntegrationComponent],
  imports: [
    TableModule,
    CommonModule,
    IntegrationRoutingModule,
    SharedModule,
    DropdownModule
  ]
})
export class IntegrationModule {}
