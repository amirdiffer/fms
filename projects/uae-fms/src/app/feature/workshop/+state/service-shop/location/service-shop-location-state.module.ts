import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as serviceShopLocationReducer from './service-shop-location.reducer';
import { ServiceShopLocationService, ServiceShopLocationFacade } from './index';
import { ServiceShopLocationEffect } from './service-shop-location.effect';
import { WORKSHOP_SERVICESHOP_LOCATION_FEATURE_KEY } from './service-shop-location.entity';

@NgModule({
  imports: [
    StoreModule.forFeature(
      WORKSHOP_SERVICESHOP_LOCATION_FEATURE_KEY,
      serviceShopLocationReducer.reducer
    ),
    EffectsModule.forFeature([ServiceShopLocationEffect])
  ],
  providers: [ServiceShopLocationService, ServiceShopLocationFacade]
})
export class ServiceShopLocationStateModule {}
