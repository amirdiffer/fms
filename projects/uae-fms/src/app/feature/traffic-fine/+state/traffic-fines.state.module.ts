import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TRAFFIC_FINES_FEATURE_KEY } from './traffic-fines.entity';
import { reducers } from './traffic-fines.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TrafficFineTableEffect } from './traffic-fine/traffic-fine-table.effect';
import {
  TrafficFineTableFacade,
  TrafficFineTableService
} from './traffic-fine';
import { AssetTrafficFineEffect } from './asset-traffic-fine/asset-traffic-fine.effect';
import {
  AssetTrafficFineService,
  AssetTrafficFineFacade
} from './asset-traffic-fine/index';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(TRAFFIC_FINES_FEATURE_KEY, reducers),
    EffectsModule.forFeature([TrafficFineTableEffect, AssetTrafficFineEffect])
  ],
  providers: [
    TrafficFineTableService,
    TrafficFineTableFacade,
    AssetTrafficFineService,
    AssetTrafficFineFacade
  ]
})
export class TrafficFinesStateModule {}
