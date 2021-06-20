import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AccessoryEffect } from './accessory.effect';
import { FLEET_ACCESSORY_FEATURE_KEY } from './accessory.entity';
import { AccessoryFacade, AccessoryService } from './index';
import * as accessoryReducer from './accessory.reducer';
@NgModule({
  imports: [
    StoreModule.forFeature(
      FLEET_ACCESSORY_FEATURE_KEY,
      accessoryReducer.reducer
    ),
    EffectsModule.forFeature([AccessoryEffect])
  ],
  providers: [AccessoryFacade, AccessoryService]
})
export class AccessoryStateModule {}
