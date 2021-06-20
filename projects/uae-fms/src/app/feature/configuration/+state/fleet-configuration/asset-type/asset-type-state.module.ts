import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FLEET_CONFIGURATION_ASSET_TYPE_FEATURE_KEY } from './asset-type.entity';
import * as assetTypeReducer from './asset-type.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AssetTypeEffect } from './asset-type.effects';
import { AssetTypeService } from './asset-type.service';
import { AssetTypeFacade } from './asset-type.facade';

@NgModule({
  imports: [
    StoreModule.forFeature(FLEET_CONFIGURATION_ASSET_TYPE_FEATURE_KEY, assetTypeReducer.reducer),
    EffectsModule.forFeature([AssetTypeEffect])
  ],
  providers: [
    AssetTypeService,
    AssetTypeFacade
  ]
})
export class AssetTypeStateModule {
}
