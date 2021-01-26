import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './integration.component';
import { TableModule } from '@core/table';

@NgModule({
  declarations: [IntegrationComponent],
  imports: [TableModule, CommonModule, IntegrationRoutingModule]
})
export class IntegrationModule {}
