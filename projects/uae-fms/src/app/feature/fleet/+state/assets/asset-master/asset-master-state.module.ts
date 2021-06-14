import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AssetMasterEffects } from './asset-master.effects';
import { FLEET_ASSET_MASTER_FEATURE_KEY } from './asset-master.entity';
import * as assetMasterReducer from './asset-master.reducer';
import { AssetMasterService, AssetMasterFacade } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(
      FLEET_ASSET_MASTER_FEATURE_KEY,
      assetMasterReducer.reducer
    ),
    EffectsModule.forFeature([AssetMasterEffects])
  ],
  providers: [AssetMasterService, AssetMasterFacade]
})
export class AssetMasterStateModule {}
