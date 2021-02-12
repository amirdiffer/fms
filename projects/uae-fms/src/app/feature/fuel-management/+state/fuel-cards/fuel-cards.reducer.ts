import { Action, createReducer, on } from '@ngrx/store';
import { FuelCardsActions } from './fuel-cards.actions';
import {
  fuelCardsAdapter,
  FuelCardsState,
  initialState
} from './fuel-cards.entity';

const fuelCardsReducer = createReducer(
  initialState,
  on(FuelCardsActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(FuelCardsActions.allDataLoaded, (state, { data }) =>
    fuelCardsAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(FuelCardsActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: FuelCardsState, action: Action) {
  return fuelCardsReducer(state, action);
}
