import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './workshop.reducer';
import { WORKSHOP_FEATURE_KEY } from './workshop.entity';
import { BodyShopRequestFacade, 
        BodyShopRequestService,
        BodyShopJobCardFacade,
        BodyShopJobCardService,  
        BodyShopTechnicianFacade,
        BodyShopTechnicianService,
        BodyShopLocationFacade,
        BodyShopLocationService
      } from './body-shop/index';
import { BodyShopRequestEffect } from './body-shop/request/body-shop-request.effects';
import {
  TechnicalInspectionFacade,
  TechnicalInspectionService
} from './technical-inspections';
import { TechnicalInspectionEffect } from './technical-inspections/technical-inspections.effect';
import { AuctionListEffect } from './auction-list/auction-list.effects';
import { AuctionListFacade, AuctionListService } from './auction-list';
import { TaskMasterEffect } from './task-master/task-master.effects';
import { TaskMasterService, TaskMasterFacade } from './task-master';
import { BodyShopJobCardEffect } from './body-shop/job-card/body-shop-job-card.effect';
import { BodyShopTechnicianEffect } from './body-shop/technician/body-shop-technician.effect';
import { BodyShopLocationEffect } from './body-shop/location/body-shop-location.effect';

@NgModule({
  imports: [
    StoreModule.forFeature(WORKSHOP_FEATURE_KEY, reducers),
    EffectsModule.forFeature([
      BodyShopRequestEffect,
      BodyShopJobCardEffect,
      BodyShopTechnicianEffect,
      BodyShopLocationEffect,
      TechnicalInspectionEffect,
      AuctionListEffect,
      TaskMasterEffect
    ])
  ],
  exports: [],
  declarations: [],
  providers: [
    BodyShopRequestFacade,
    BodyShopRequestService,
    BodyShopJobCardFacade,
    BodyShopJobCardService,
    BodyShopTechnicianFacade,
    BodyShopTechnicianService,
    BodyShopLocationFacade,
    BodyShopLocationService,
    TechnicalInspectionFacade,
    TechnicalInspectionService,
    AuctionListFacade,
    AuctionListService,
    TaskMasterFacade,
    TaskMasterService
  ]
})
export class WorkshopStateModule {}
