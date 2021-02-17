import { Action, createReducer, on } from '@ngrx/store';
import { BodyShopLocationActions } from './body-shop-location.actions';
import {
  bodyShopLocationAdapter,
  IBodyShopLocationState,
  initialState
} from './body-shop-location.entity';

const bodyShopLocationReducer = createReducer(
  initialState,
  on(BodyShopLocationActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(BodyShopLocationActions.allDataLoaded, (state, { data }) =>
    bodyShopLocationAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),
  on(BodyShopLocationActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: IBodyShopLocationState, action: Action) {
  return bodyShopLocationReducer(state, action);
}
