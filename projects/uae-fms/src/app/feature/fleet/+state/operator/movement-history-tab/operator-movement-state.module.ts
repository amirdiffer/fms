import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FLEET_OPERATOR_MOVEMENT_HISTORY_FEATURE_KEY } from './operator-movement-history.entity';
import * as operatorMovementReducer from './operator-movement-history.reducer';
import { OperatorMovementHistoryEffect } from './operator-movement-history.effect';
import {
  OperatorMovementHistoryService,
  OperatorMovementHistoryFacade
} from './index';
@NgModule({
  imports: [
    StoreModule.forFeature(
      FLEET_OPERATOR_MOVEMENT_HISTORY_FEATURE_KEY,
      operatorMovementReducer.reducer
    ),
    EffectsModule.forFeature([OperatorMovementHistoryEffect])
  ],
  providers: [OperatorMovementHistoryService, OperatorMovementHistoryFacade]
})
export class OperatorMovementStateModule {}
