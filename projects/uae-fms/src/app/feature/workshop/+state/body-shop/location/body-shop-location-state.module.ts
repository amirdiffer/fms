import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BodyShopLocationEffect } from './body-shop-location.effect';
import { WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY } from './body-shop-location.entity';
import * as bodyShopLocationReducer from './body-shop-location.reducer';
import { BodyShopLocationService, BodyShopLocationFacade } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(
      WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY,
      bodyShopLocationReducer.reducer
    ),
    EffectsModule.forFeature([BodyShopLocationEffect])
  ],
  providers: [BodyShopLocationService, BodyShopLocationFacade]
})
export class BodyShopLocationStateModule {}
