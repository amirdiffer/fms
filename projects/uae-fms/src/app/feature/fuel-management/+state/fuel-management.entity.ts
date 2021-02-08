import {
  FUEL_MANAGEMENT_FUEL_CARDS_FEATURE_KEY,
  FuelCardsState
} from './fuel-cards/fuel-cards.entity';
export const FUEL_MANAGEMENT_FEATURE_KEY = 'fuel-management';

export interface State {
  readonly [FUEL_MANAGEMENT_FUEL_CARDS_FEATURE_KEY]: FuelCardsState;
}

export interface FuelManagementPartialState {
  readonly [FUEL_MANAGEMENT_FEATURE_KEY]: State;
}
