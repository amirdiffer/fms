import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FleetStatusSubAssetEffect } from './fleet-status-sub-asset.effect';
import { CONFIGURATION_FLEET_STATUS_SUB_ASSET_FEATURE_KEY } from './fleet-status-sub-asset.entity';
import * as fleetStatusSubAssetReducer from './fleet-status-sub-asset.reducer';
import { FleetStatusSubAssetFacade, FleetStatusSubAssetService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(CONFIGURATION_FLEET_STATUS_SUB_ASSET_FEATURE_KEY, fleetStatusSubAssetReducer.reducer),
    EffectsModule.forFeature([FleetStatusSubAssetEffect])
  ],
  providers: [
    FleetStatusSubAssetService,
    FleetStatusSubAssetFacade
  ]
})

export class FleetStatusSubAssetStateModule {
}
