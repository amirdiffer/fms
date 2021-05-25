import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PartMasterFacade } from './part-master/part-master.facade';
import { PartMasterEffect } from './part-master/part-master.effects';
import { PARTSTORE_FEATURE_KEY } from './part-store.entity';
import { reducers } from './part-store.reducer';

import { PartListFacade } from './part-list/part-list.facade';
import { PartListEffect } from './part-list/part-list.effects';
import { PartListService } from './part-list/part-list.service';
import { PartMasterService } from './part-master/part-master.service';
import {
  RequestListFacade,
  RequestListService
} from '@feature/part-store/+state/order-list/request';
import { RequestListEffect } from '@feature/part-store/+state/order-list/request/request-list.effects';
import {
  SuppliersFacade,
  SuppliersService
} from '@feature/part-store/+state/order-list/suppliers';
import { SuppliersEffects } from '@feature/part-store/+state/order-list/suppliers/suppliers.effects';
import { ConfigurationStateModule } from '@feature/configuration/+state';
import { WorkshopStateModule } from '@feature/workshop/+state';
import { OrderListEffect } from './order-list/order/order.effects';
import { OrderListFacade, OrderListService } from './order-list/order/index';

@NgModule({
  imports: [
    StoreModule.forFeature(PARTSTORE_FEATURE_KEY, reducers),
    EffectsModule.forFeature([
      PartListEffect,
      PartMasterEffect,
      RequestListEffect,
      SuppliersEffects,
      OrderListEffect
      
    ]),
    ConfigurationStateModule,
    WorkshopStateModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    PartMasterService,
    PartListService,
    PartListFacade,
    PartMasterFacade,
    RequestListService,
    RequestListFacade,
    SuppliersFacade,
    SuppliersService,
    OrderListService,
    OrderListFacade

  ]
})
export class PartStoreStateModule {}
