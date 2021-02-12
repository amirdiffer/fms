import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './integration.component';
import { TableModule } from '@core/table';
import { AddIntegrationComponent } from './add-integration/add-integration.component';
import { DropdownModule } from 'primeng/dropdown';
import { StoreModule } from '@ngrx/store';
import { INTEGRATION_FEATURE_KEY } from './+state/integration.entity';
import { reducer } from './+state/integration.reducer';
import { EffectsModule } from '@ngrx/effects';
import { IntegrationEffect } from './+state/integration.effect';
import { IntegrationFacade, IntegrationService } from './+state';

@NgModule({
  declarations: [IntegrationComponent, AddIntegrationComponent],
  imports: [
    TableModule,
    CommonModule,
    IntegrationRoutingModule,
    SharedModule,
    DropdownModule,
    StoreModule.forFeature(INTEGRATION_FEATURE_KEY, reducer),
    EffectsModule.forFeature([IntegrationEffect])
  ],
  providers: [IntegrationFacade, IntegrationService]
})
export class IntegrationModule {}
