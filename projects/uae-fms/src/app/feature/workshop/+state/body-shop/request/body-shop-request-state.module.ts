import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as bodyShopRequestReducer from './body-shop-request.reducer';
import { WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY } from './body-shop-request.entity';
import { BodyShopRequestService, BodyShopRequestFacade } from './index';
import { BodyShopRequestEffect } from './body-shop-request.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY,
      bodyShopRequestReducer.reducer
    ),
    EffectsModule.forFeature([BodyShopRequestEffect])
  ],
  providers: [BodyShopRequestService, BodyShopRequestFacade]
})
export class BodyShopRequestStateModule {}
