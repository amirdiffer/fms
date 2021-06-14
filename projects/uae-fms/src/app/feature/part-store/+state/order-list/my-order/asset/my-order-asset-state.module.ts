import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MyOrderAssetEffects } from './my-order-asset.effects';
import * as myOrderAssetReducer from './my-order-asset.reducer';
import { MyOrderAssetService, MyOrderAssetFacade } from './index';
import { PARTSTORE_MY_ORDER_ASSET_LIST_FEATURE_KEY } from './my-order-asset.entity';

@NgModule({
  imports: [
    StoreModule.forFeature(
      PARTSTORE_MY_ORDER_ASSET_LIST_FEATURE_KEY,
      myOrderAssetReducer.reducer
    ),
    EffectsModule.forFeature([MyOrderAssetEffects])
  ],
  providers: [MyOrderAssetService, MyOrderAssetFacade]
})
export class MyOrderAssetStateModule {}
