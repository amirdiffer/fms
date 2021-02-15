import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FUEL_MANAGEMENT_FEATURE_KEY } from './fuel-management.entity';
import { reducers } from './fuel-managment.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FuelCardsEffect } from './fuel-cards/fuel-cards.effect';
import { FuelCardsFacade, FuelCardsService } from './fuel-cards';
import { AssetUsageEffect } from './asset-usage/asset-usage.effect';
import { AssetUsageFacade , AssetUsageService } from './asset-usage/index'
@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(FUEL_MANAGEMENT_FEATURE_KEY, reducers),
    EffectsModule.forFeature([FuelCardsEffect , AssetUsageEffect])
  ],
  providers: [FuelCardsFacade, FuelCardsService , AssetUsageFacade , AssetUsageService]
})
export class FuelManagementStateModule {}
