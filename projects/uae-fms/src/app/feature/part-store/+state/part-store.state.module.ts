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
  MyOrderFacade,
  MyOrderService
} from '@feature/part-store/+state/order-list/my-order';
import { MyOrderEffects } from '@feature/part-store/+state/order-list/my-order/my-order.effects';
import {
  RequestListFacade,
  RequestListService
} from '@feature/part-store/+state/order-list/request-list';
import { RequestListEffect } from '@feature/part-store/+state/order-list/request-list/request-list.effects';
import {
  SuppliersFacade,
  SuppliersService
} from '@feature/part-store/+state/order-list/suppliers';
import { SuppliersEffects } from '@feature/part-store/+state/order-list/suppliers/suppliers.effects';
import { ConfigurationStateModule } from '@feature/configuration/+state';

@NgModule({
  imports: [
    StoreModule.forFeature(PARTSTORE_FEATURE_KEY, reducers),
    EffectsModule.forFeature([
      PartListEffect,
      PartMasterEffect,
      RequestListEffect,
      MyOrderEffects,
      SuppliersEffects
    ]),
    ConfigurationStateModule
  ],
  exports: [],
  declarations: [],
  providers: [
    PartMasterService,
    PartListService,
    PartListFacade,
    PartMasterFacade,
    MyOrderService,
    RequestListService,
    MyOrderFacade,
    RequestListFacade,
    SuppliersFacade,
    SuppliersService

  ]
})
export class PartStoreStateModule {}
