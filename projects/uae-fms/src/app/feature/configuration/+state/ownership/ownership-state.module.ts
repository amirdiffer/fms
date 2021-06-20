import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OwnershipEffect } from './ownership.effect';
import { CONFIGURATION_OWNERSHIP_FEATURE_KEY } from './ownership.entity';
import * as ownershipReducer from './ownership.reducer';
import { OwnershipFacade, OwnershipService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(CONFIGURATION_OWNERSHIP_FEATURE_KEY, ownershipReducer.reducer),
    EffectsModule.forFeature([OwnershipEffect])
  ],
  providers: [
    OwnershipService,
    OwnershipFacade
  ]
})

export class OwnershipStateModule {
}
