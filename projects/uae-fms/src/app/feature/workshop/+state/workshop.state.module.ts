import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./workshop.reducer";
import { WORKSHOP_FEATURE_KEY } from "./workshop.entity";
import { BodyShopFacade, BodyShopService } from "./body-shop";
import { BodyShopEffect } from "./body-shop/body-shop.effects";

@NgModule({
  imports: [
    StoreModule.forFeature(WORKSHOP_FEATURE_KEY, reducers),
    EffectsModule.forFeature([BodyShopEffect])
  ],
  exports: [],
  declarations: [],
  providers: [
    BodyShopFacade,
    BodyShopService
  ],
})
export class WorkshopStateModule { }
