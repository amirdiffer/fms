import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SoldListEffects } from './sold-list.effects';
import { WORKSHOP_SOLD_LIST_FEATURE_KEY } from './sold-list.entity';
import * as soldListReducer from './sold-list.reducer';
import { SoldListService, SoldListFacade } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(
      WORKSHOP_SOLD_LIST_FEATURE_KEY,
      soldListReducer.reducer
    ),
    EffectsModule.forFeature([SoldListEffects])
  ],
  providers: [SoldListService, SoldListFacade]
})
export class SoldListStateModule {}
