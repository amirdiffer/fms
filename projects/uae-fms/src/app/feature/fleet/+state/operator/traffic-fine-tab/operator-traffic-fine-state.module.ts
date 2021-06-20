import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FLEET_OPERATOR_TRAFFIC_FINE_FEATURE_KEY } from './operator-traffic-fine.entity';
import * as operatorTrafficFineReducer from './operator-traffic-fine.reducer';
import { OperatorTrafficFineEffect } from './operator-traffic-fine.effect';
import { OperatorTrafficFineFacade, OperatorTrafficFineService } from './index';
@NgModule({
  imports: [
    StoreModule.forFeature(
      FLEET_OPERATOR_TRAFFIC_FINE_FEATURE_KEY,
      operatorTrafficFineReducer.reducer
    ),
    EffectsModule.forFeature([OperatorTrafficFineEffect])
  ],
  providers: [OperatorTrafficFineFacade, OperatorTrafficFineService]
})
export class OperatorTrafficFineStateModule {}
