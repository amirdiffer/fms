import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SubAssetPolicyEffect } from './sub-asset-policy.effect';
import { CONFIGURATION_SUB_ASSET_POLICY_FEATURE_KEY } from './sub-asset-policy.entity';
import * as subAssetPolicyReducer from './sub-asset-policy.reducer';
import { SubAssetPolicyFacade, SubAssetPolicyService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(CONFIGURATION_SUB_ASSET_POLICY_FEATURE_KEY, subAssetPolicyReducer.reducer),
    EffectsModule.forFeature([SubAssetPolicyEffect])
  ],
  providers: [
    SubAssetPolicyService,
    SubAssetPolicyFacade
  ]
})

export class SubAssetPolicyStateModule {
}
