import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AssetPolicyEffect } from './asset-policy.effect';
import { CONFIGURATION_ASSET_POLICY_FEATURE_KEY } from './asset-policy.entity';
import * as assetPolicyReducer from './asset-policy.reducer';
import { AssetPolicyFacade, AssetPolicyService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(CONFIGURATION_ASSET_POLICY_FEATURE_KEY, assetPolicyReducer.reducer),
    EffectsModule.forFeature([AssetPolicyEffect])
  ],
  providers: [
    AssetPolicyService,
    AssetPolicyFacade
  ]
})

export class AssetPolicyStateModule {
}
