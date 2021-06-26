import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BodyShopJobCardEffect } from './body-shop-job-card.effect';
import { WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY } from './body-shop-job-card.entity';
import * as bodyShopJobCardReducer from './body-shop-job-card.reducer';
import { BodyShopJobCardService, BodyShopJobCardFacade } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(
      WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY,
      bodyShopJobCardReducer.reducer
    ),
    EffectsModule.forFeature([BodyShopJobCardEffect])
  ],
  providers: [BodyShopJobCardService, BodyShopJobCardFacade]
})
export class BodyShopJobCardStateModule {}
