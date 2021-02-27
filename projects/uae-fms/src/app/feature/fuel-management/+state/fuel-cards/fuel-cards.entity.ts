import { IFuelManagementFuelCard } from '@models/fuel-management';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FUEL_MANAGEMENT_FUEL_CARDS_FEATURE_KEY = 'fuelCards';

export interface FuelCardsState extends EntityState<IFuelManagementFuelCard> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface FuelCardsPartialState {
  [FUEL_MANAGEMENT_FUEL_CARDS_FEATURE_KEY]: FuelCardsState;
}

export const fuelCardsAdapter: EntityAdapter<IFuelManagementFuelCard> = createEntityAdapter<
IFuelManagementFuelCard
>();

export const initialState: FuelCardsState = fuelCardsAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null
} as FuelCardsState);
