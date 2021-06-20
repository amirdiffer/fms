import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrderListEffect } from './order.effects';
import * as orderListReducer from './order.reducer';
import { OrderListService, OrderListFacade } from './index';
import { PARTSTORE_ORDER_LIST_FEATURE_KEY } from './order.entity';

@NgModule({
  imports: [
    StoreModule.forFeature(
      PARTSTORE_ORDER_LIST_FEATURE_KEY,
      orderListReducer.reducer
    ),
    EffectsModule.forFeature([OrderListEffect])
  ],
  providers: [OrderListService, OrderListFacade]
})
export class OrderListStateModule {}
