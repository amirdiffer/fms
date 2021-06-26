import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FleetStatusAssetEffect } from './fleet-status-asset.effect';
import { CONFIGURATION_FLEET_STATUS_ASSET_FEATURE_KEY } from './fleet-status-asset.entity';
import * as fleetStatusAssetReducer from './fleet-status-asset.reducer';
import { FleetStatusAssetFacade, FleetStatusAssetService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(CONFIGURATION_FLEET_STATUS_ASSET_FEATURE_KEY, fleetStatusAssetReducer.reducer),
    EffectsModule.forFeature([FleetStatusAssetEffect])
  ],
  providers: [
    FleetStatusAssetService,
    FleetStatusAssetFacade
  ]
})

export class FleetStatusAssetStateModule {
}
