import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FLEET_OPERATOR_FEATURE_KEY } from './operator.entity';
import * as operatorReducer from './operator.reducer';
import { OperatorEffect } from './operator.effect';
import { OperatorFacade, OperatorService } from './index';
@NgModule({
  imports: [
    StoreModule.forFeature(FLEET_OPERATOR_FEATURE_KEY, operatorReducer.reducer),
    EffectsModule.forFeature([OperatorEffect])
  ],
  providers: [OperatorFacade, OperatorService]
})
export class OperatorStateModule {}
