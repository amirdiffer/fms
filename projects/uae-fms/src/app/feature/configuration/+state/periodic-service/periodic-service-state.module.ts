import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PeriodicServiceEffect } from './periodic-service.effect';
import { CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY } from './periodic-service.entity';
import * as periodicServiceReducer from './periodic-service.reducer';
import { PeriodicServiceFacade, PeriodicServiceService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY, periodicServiceReducer.reducer),
    EffectsModule.forFeature([PeriodicServiceEffect])
  ],
  providers: [
    PeriodicServiceService,
    PeriodicServiceFacade
  ]
})

export class PeriodicServiceStateModule {
}
