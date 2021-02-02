import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./workshop.reducer";
import { WORKSHOP_FEATURE_KEY } from "./workshop.entity";
import { BodyShopFacade, BodyShopService } from "./body-shop";
import { BodyShopEffect } from "./body-shop/body-shop.effects";
import { TechnicalInspectionFacade, TechnicalInspectionService } from './technical-inspections';
import { TechnicalInspectionEffect } from './technical-inspections/technical-inspections.effect';
import { AuctionListEffect } from './auction-list/auction-list.effects';
import { AuctionListFacade, AuctionListService } from './auction-list';

@NgModule({
  imports: [
    StoreModule.forFeature(WORKSHOP_FEATURE_KEY, reducers),
    EffectsModule.forFeature([BodyShopEffect, TechnicalInspectionEffect, AuctionListEffect])
  ],
  exports: [],
  declarations: [],
  providers: [
    BodyShopFacade,
    BodyShopService,
    TechnicalInspectionFacade,
    TechnicalInspectionService,
    AuctionListFacade,
    AuctionListService,

  ],
})
export class WorkshopStateModule { }
