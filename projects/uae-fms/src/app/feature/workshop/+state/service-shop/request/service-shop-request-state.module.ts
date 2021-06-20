import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as serviceShopRequestReducer from './service-shop-request.reducer';
import { ServiceShopRequestService, ServiceShopRequestFacade } from './index';
import { WORKSHOP_SERVICESHOP_REQUEST_FEATURE_KEY } from './service-shop-request.entity';
import { ServiceShopRequestEffect } from './service-shop-request.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      WORKSHOP_SERVICESHOP_REQUEST_FEATURE_KEY,
      serviceShopRequestReducer.reducer
    ),
    EffectsModule.forFeature([ServiceShopRequestEffect])
  ],
  providers: [ServiceShopRequestService, ServiceShopRequestFacade]
})
export class ServiceShopRequestStateModule {}
