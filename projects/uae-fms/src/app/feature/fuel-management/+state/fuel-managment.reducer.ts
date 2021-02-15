import * as fuelCardsReducer from './fuel-cards/fuel-cards.reducer';
import * as assetUsageReducer from './asset-usage/asset-usage.reducer'
import { FUEL_MANAGEMENT_FUEL_CARDS_FEATURE_KEY } from './fuel-cards/fuel-cards.entity';
import { FUEL_MANAGEMENT_ASSET_USAGE_FEATURE_KEY } from './asset-usage/asset-usage.entity';

export const reducers = {
  [FUEL_MANAGEMENT_FUEL_CARDS_FEATURE_KEY]: fuelCardsReducer.reducer,
  [FUEL_MANAGEMENT_ASSET_USAGE_FEATURE_KEY]: assetUsageReducer.reducer 
};
