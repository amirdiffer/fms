import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FUEL_MANAGEMENT_FUEL_CARDS_FEATURE_KEY = 'fuelCards';

export interface FuelCardsStateModel {
  tagNoItem: {
    tagNo: string;
    subInfo: string;
  };
  used: string;
  usageLimit: string;
  asset: string;
  cardType: string;
  expireDate: string;
}

export interface FuelCardsState extends EntityState<FuelCardsStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface FuelCardsPartialState {
  [FUEL_MANAGEMENT_FUEL_CARDS_FEATURE_KEY]: FuelCardsState;
}

export const fuelCardsAdapter: EntityAdapter<FuelCardsStateModel> = createEntityAdapter<
  FuelCardsStateModel
>();

export const initialState: FuelCardsState = fuelCardsAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null
} as FuelCardsState);
