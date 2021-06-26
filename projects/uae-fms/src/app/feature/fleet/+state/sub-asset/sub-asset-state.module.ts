import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FLEET_SUB_ASSET_FEATURE_KEY } from './sub-asset.entity';
import * as subAssetReducer from './sub-asset.reducer';
import { SubAssetEffect } from './sub-asset.effect';
import { SubAssetFacade, SubAssetService } from './index';
@NgModule({
  imports: [
    StoreModule.forFeature(
      FLEET_SUB_ASSET_FEATURE_KEY,
      subAssetReducer.reducer
    ),
    EffectsModule.forFeature([SubAssetEffect])
  ],
  providers: [SubAssetFacade, SubAssetService]
})
export class SubAssetStateModule {}
