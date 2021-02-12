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

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(TRAFFIC_FINES_FEATURE_KEY, reducers),
    EffectsModule.forFeature([TrafficFineTableEffect])
  ],
  providers: [TrafficFineTableService, TrafficFineTableFacade]
})
export class TrafficFinesStateModule {}
