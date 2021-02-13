import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FUEL_MANAGEMENT_FEATURE_KEY } from './fuel-management.entity';
import { reducers } from './fuel-managment.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FuelCardsEffect } from './fuel-cards/fuel-cards.effect';
import { FuelCardsFacade, FuelCardsService } from './fuel-cards';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(FUEL_MANAGEMENT_FEATURE_KEY, reducers),
    EffectsModule.forFeature([FuelCardsEffect])
  ],
  providers: [FuelCardsFacade, FuelCardsService]
})
export class FuelManagementStateModule {}
