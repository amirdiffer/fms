import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FLEET_FEATURE_KEY } from './fleet.entity';
import { reducers } from './fleet.reducer';
import {
  MovementOverviewFacade,
  MovementOverviewService,
  MovementRequestsFacade,
  MovementRequestsService
} from './movement';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(FLEET_FEATURE_KEY, reducers),
    EffectsModule.forFeature([MovementOverviewFacade, MovementRequestsFacade])
  ],
  providers: [
    MovementOverviewFacade,
    MovementOverviewService,
    MovementRequestsFacade,
    MovementRequestsService
  ]
})
export class FleetStateModule {}
