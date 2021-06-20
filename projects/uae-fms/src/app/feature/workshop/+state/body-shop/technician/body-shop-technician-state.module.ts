import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BodyShopTechnicianEffect } from './body-shop-technician.effect';
import { WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY } from './body-shop-technician.entity';
import * as bodyShopTechnicianReducer from './body-shop-technician.reducer';
import { BodyShopTechnicianService, BodyShopTechnicianFacade } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(
      WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY,
      bodyShopTechnicianReducer.reducer
    ),
    EffectsModule.forFeature([BodyShopTechnicianEffect])
  ],
  providers: [BodyShopTechnicianService, BodyShopTechnicianFacade]
})
export class BodyShopTechnicianStateModule {}
