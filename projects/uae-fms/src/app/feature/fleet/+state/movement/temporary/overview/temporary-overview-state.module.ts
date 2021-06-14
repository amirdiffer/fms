import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MovementOverviewEffectTemporary } from './movement-overview.effect';
import { FLEET_MOVEMENT_TEMPORARY_OVERVIEW_FEATURE_KEY } from './movement-overview.entity';
import * as movementOverviewReducer from './movement-overview.reducer';
import {
  MovementOverviewServiceTemporary,
  MovementOverviewFacadeTemporary
} from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(
      FLEET_MOVEMENT_TEMPORARY_OVERVIEW_FEATURE_KEY,
      movementOverviewReducer.reducer
    ),
    EffectsModule.forFeature([MovementOverviewEffectTemporary])
  ],
  providers: [MovementOverviewServiceTemporary, MovementOverviewFacadeTemporary]
})
export class TemporaryOverviewStateModule {}
