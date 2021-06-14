import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as serviceShopTechnicianReducer from './service-shop-technician.reducer';
import {
  ServiceShopTechnicianService,
  ServiceShopTechnicianFacade
} from './index';
import { WORKSHOP_SERVICESHOP_TECHNICIAN_FEATURE_KEY } from './service-shop-technician.entity';
import { ServiceShopTechnicianEffect } from './service-shop-technician.effect';

@NgModule({
  imports: [
    StoreModule.forFeature(
      WORKSHOP_SERVICESHOP_TECHNICIAN_FEATURE_KEY,
      serviceShopTechnicianReducer.reducer
    ),
    EffectsModule.forFeature([ServiceShopTechnicianEffect])
  ],
  providers: [ServiceShopTechnicianService, ServiceShopTechnicianFacade]
})
export class ServiceShopTechnicianStateModule {}
