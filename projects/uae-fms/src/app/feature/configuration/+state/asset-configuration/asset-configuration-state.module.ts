import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AssetConfigurationEffect } from './asset-configuration.effect';
import { CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY } from './asset-configuration.entity';
import * as assetConfigurationReducer from './asset-configuration.reducer';
import { AssetConfigurationFacade, AssetConfigurationService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY, assetConfigurationReducer.reducer),
    EffectsModule.forFeature([AssetConfigurationEffect])
  ],
  providers: [
    AssetConfigurationService,
    AssetConfigurationFacade
  ]
})

export class AssetConfigurationStateModule {
}
