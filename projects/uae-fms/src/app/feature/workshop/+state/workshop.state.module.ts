import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './workshop.reducer';
import { WORKSHOP_FEATURE_KEY } from './workshop.entity';
import {
  BodyShopRequestFacade,
  BodyShopRequestService,
  BodyShopJobCardFacade,
  BodyShopJobCardService,
  BodyShopTechnicianFacade,
  BodyShopTechnicianService,
  BodyShopLocationFacade,
  BodyShopLocationService
} from './body-shop/index';
import {
  ServiceShopRequestFacade,
  ServiceShopRequestService,
  ServiceShopJobCardFacade,
  ServiceShopJobCardService,
  ServiceShopTechnicianFacade,
  ServiceShopTechnicianService,
  ServiceShopLocationFacade,
  ServiceShopLocationService,
} from './service-shop/index'
import { BodyShopRequestEffect } from './body-shop/request/body-shop-request.effects';
import {
  TechnicalInspectionFacade,
  TechnicalInspectionService
} from './technical-inspections';
import { TechnicalInspectionEffect } from './technical-inspections/technical-inspections.effect';
import { TaskMasterEffect } from './task-master/task-master.effects';
import { TaskMasterService, TaskMasterFacade } from './task-master';
import { BodyShopJobCardEffect } from './body-shop/job-card/body-shop-job-card.effect';
import { BodyShopTechnicianEffect } from './body-shop/technician/body-shop-technician.effect';
import { BodyShopLocationEffect } from './body-shop/location/body-shop-location.effect';
import {
  AuctionListFacade,
  AuctionListService,
  SoldListFacade,
  SoldListService
} from '@feature/workshop/+state/auction-list';
import { AuctionListEffect } from '@feature/workshop/+state/auction-list/auction/auction-list.effects';
import { SoldListEffects } from '@feature/workshop/+state/auction-list/sold/sold-list.effects';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import { UsersService } from '@feature/configuration/+state/users';
import { FleetStateModule } from '@feature/fleet/+state';
import { ServiceShopRequestEffect } from './service-shop/request/service-shop-request.effects';
import { ServiceShopTechnicianEffect } from './service-shop/technician/service-shop-technician.effect';
import { ServiceShopJobCardEffect } from './service-shop/job-card/service-shop-job-card.effect';
import { ServiceShopLocationEffect } from './service-shop/location/service-shop-location.effect';

@NgModule({
  imports: [
    StoreModule.forFeature(WORKSHOP_FEATURE_KEY, reducers),
    EffectsModule.forFeature([
      BodyShopRequestEffect,
      BodyShopJobCardEffect,
      BodyShopTechnicianEffect,
      BodyShopLocationEffect,
      ServiceShopRequestEffect,
      ServiceShopLocationEffect,
      ServiceShopJobCardEffect,
      ServiceShopTechnicianEffect,
      TechnicalInspectionEffect,
      AuctionListEffect,
      SoldListEffects,
      TaskMasterEffect
    ]),
    FleetStateModule
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
    ServiceShopRequestFacade,
    ServiceShopRequestService,
    ServiceShopJobCardFacade,
    ServiceShopJobCardService,
    ServiceShopTechnicianFacade,
    ServiceShopTechnicianService,
    ServiceShopLocationFacade,
    ServiceShopLocationService,
    TechnicalInspectionFacade,
    TechnicalInspectionService,
    AuctionListFacade,
    AuctionListService,
    SoldListFacade,
    SoldListService,
    TaskMasterFacade,
    TaskMasterService,
    AssetMasterFacade,
    UsersService
  ]
})
export class WorkshopStateModule {}
