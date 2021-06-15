import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MovementOverviewEffect } from './movement-overview.effect';
import { FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY } from './movement-overview.entity';
import * as movementOverviewReducer from './movement-overview.reducer';
import { MovementOverviewService, MovementOverviewFacade } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(
      FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY,
      movementOverviewReducer.reducer
    ),
    EffectsModule.forFeature([MovementOverviewEffect])
  ],
  providers: [MovementOverviewService, MovementOverviewFacade]
})
export class PermanentOverviewStateModule {}
