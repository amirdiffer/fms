import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SubAssetTypeEffect } from './sub-asset-type.effects';
import { FLEET_CONFIGURATION_SUB_ASSET_TYPE_FEATURE_KEY } from './sub-asset-type.entity';
import * as subAssetTypeReducer from './sub-asset-type.reducer';
import { SubAssetTypeFacade, SubAssetTypeService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(FLEET_CONFIGURATION_SUB_ASSET_TYPE_FEATURE_KEY, subAssetTypeReducer.reducer),
    EffectsModule.forFeature([SubAssetTypeEffect])
  ],
  providers: [
    SubAssetTypeService,
    SubAssetTypeFacade
  ]
})

export class SubAssetTypeStateModule {
}
