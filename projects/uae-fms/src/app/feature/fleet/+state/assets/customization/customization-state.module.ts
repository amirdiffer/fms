import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomizationEffects } from './customization.effects';
import * as customizationReducer from './customization.reducer';
import { FLEET_CUSTOMIZATION_FEATURE_KEY } from './customization.entity';
import { CustomizationService, CustomizationFacade } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(
      FLEET_CUSTOMIZATION_FEATURE_KEY,
      customizationReducer.reducer
    ),
    EffectsModule.forFeature([CustomizationEffects])
  ],
  providers: [CustomizationService, CustomizationFacade]
})
export class CustomizationStateModule {}
