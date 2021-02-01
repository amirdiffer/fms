import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './integration.component';
import { TableModule } from '@core/table';
import { AddIntegrationComponent } from './add-integration/add-integration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [IntegrationComponent, AddIntegrationComponent],
  imports: [
    TableModule, 
    CommonModule, 
    IntegrationRoutingModule, 
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class IntegrationModule {}
