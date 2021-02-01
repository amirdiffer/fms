import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { reducers } from "./workshop.reducer";
import { WORKSHOP_FEATURE_KEY } from "./workshop.entity";
import { BodyShopFacade, BodyShopService } from "./body-shop";

@NgModule({
  imports: [
    StoreModule.forFeature(WORKSHOP_FEATURE_KEY, reducers)
  ],
  exports: [],
  declarations: [],
  providers: [
    BodyShopFacade,
    BodyShopService
  ],
})
export class WorkshopStateModule { }
