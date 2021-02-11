import * as fuelCardsReducer from './fuel-cards/fuel-cards.reducer';
import { FUEL_MANAGEMENT_FUEL_CARDS_FEATURE_KEY } from './fuel-cards/fuel-cards.entity';

export const reducers = {
  [FUEL_MANAGEMENT_FUEL_CARDS_FEATURE_KEY]: fuelCardsReducer.reducer
};
