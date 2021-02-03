import { Action, createReducer, on } from '@ngrx/store';
import {
  initialState,
  bodyShopAdapter,
  BodyShopState
} from './body-shop.entity';
import { BodyShopActions } from './body-shop.actions';
import { state } from '@angular/animations';

const bodyShopReducer = createReducer(
  initialState,
  on(BodyShopActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(BodyShopActions.allDataLoaded, (state, { data }) =>
    bodyShopAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(BodyShopActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: BodyShopState, action: Action) {
  return bodyShopReducer(state, action);
}
