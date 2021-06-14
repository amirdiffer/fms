import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as technicalInspectionReducer from './technical-inspections.reducer';
import { TechnicalInspectionFacade, TechnicalInspectionService } from './index';
import { WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY } from './technical-inspections.entity';
import { TechnicalInspectionEffect } from './technical-inspections.effect';

@NgModule({
  imports: [
    StoreModule.forFeature(
      WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY,
      technicalInspectionReducer.reducer
    ),
    EffectsModule.forFeature([TechnicalInspectionEffect])
  ],
  providers: [TechnicalInspectionFacade, TechnicalInspectionService]
})
export class TechnicalInspectionStateModule {}
