import { OrderListService } from './order-list/order-list.service';
import { OrderListFacade } from './order-list/order-list.facade';
import { PartMasterService } from './../part-master/part-master.service';
import { PartListService } from './part-list/part-list.service';
import { PartMasterFacade } from './part-master/part-master.facade';
import { PartMasterEffect } from './part-master/part-master.effects';
import { PartListEffect } from './part-list/part-list.effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PARTSTORE_FEATURE_KEY } from './part-store.entity';
import { OrderListEffect } from './order-list/order-list.effects';
import { reducers } from './part-store.reducer';
import { PartListFacade } from './part-list/part-list.facade';

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
    PartListFacade,
    PartListService,
    PartMasterFacade,
    PartMasterService,
    OrderListFacade,
    OrderListService
  ]
})
export class PartStoreStateModule {}
