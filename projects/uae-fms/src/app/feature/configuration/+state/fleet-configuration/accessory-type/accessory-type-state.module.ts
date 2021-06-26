import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AccessoryTypeEffect } from './accessory-type.effects';
import { FLEET_CONFIGURATION_ACCESSORY_TYPE_FEATURE_KEY } from './accessory-type.entity';
import * as accessoryTypeReducer from './accessory-type.reducer';
import { AccessoryTypeFacade, AccessoryTypeService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(FLEET_CONFIGURATION_ACCESSORY_TYPE_FEATURE_KEY, accessoryTypeReducer.reducer),
    EffectsModule.forFeature([AccessoryTypeEffect])
  ],
  providers: [
    AccessoryTypeService,
    AccessoryTypeFacade
  ]
})

export class AccessoryTypeStateModule {
}
