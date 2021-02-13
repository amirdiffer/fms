import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PartMasterFacade } from './part-master/part-master.facade';
import { PartMasterEffect } from './part-master/part-master.effects';
import { PARTSTORE_FEATURE_KEY } from './part-store.entity';
import { reducers } from './part-store.reducer';

import { OrderListFacade } from './order-list/order-list.facade';
import { OrderListEffect } from './order-list/order-list.effects';
import { PartListFacade } from './part-list/part-list.facade';
import { PartListEffect } from './part-list/part-list.effects';

import { PartMasterService } from './part-master/part-master.service';
import { OrderListService } from './order-list/order-list.service';
import { PartListService } from './part-list/part-list.service';

@NgModule({
  imports: [
    StoreModule.forFeature(PARTSTORE_FEATURE_KEY, reducers),
    EffectsModule.forFeature([
      PartListEffect,
      PartMasterEffect,
      OrderListEffect
    ])
  ],
  exports: [],
  declarations: [],
  providers: [
    PartMasterService,
    PartListService,
    PartListFacade,
    OrderListFacade,
    PartMasterFacade,
    OrderListService
  ]
})
export class PartStoreStateModule {}
