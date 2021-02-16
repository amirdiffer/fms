import {
  FUEL_MANAGEMENT_ASSET_USAGE_FEATURE_KEY,
  IAssetUsageState
} from './asset-usage/asset-usage.entity';
import {
  FUEL_MANAGEMENT_FUEL_CARDS_FEATURE_KEY,
  FuelCardsState
} from './fuel-cards/fuel-cards.entity';
export const FUEL_MANAGEMENT_FEATURE_KEY = 'fuel-management';

export interface State {
  readonly [FUEL_MANAGEMENT_FUEL_CARDS_FEATURE_KEY]: FuelCardsState;
  readonly [FUEL_MANAGEMENT_ASSET_USAGE_FEATURE_KEY]: IAssetUsageState;
}

export interface FuelManagementPartialState {
  readonly [FUEL_MANAGEMENT_FEATURE_KEY]: State;
}
