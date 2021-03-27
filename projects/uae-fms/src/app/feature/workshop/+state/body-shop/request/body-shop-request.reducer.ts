import { Action, createReducer, on } from '@ngrx/store';
import {
  initialState,
  bodyShopRequestAdapter,
  BodyShopRequestState
} from './body-shop-request.entity';
import { BodyShopRequestActions } from './body-shop-request.actions';

const bodyShopRequestReducer = createReducer(
  initialState,
  on(BodyShopRequestActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(BodyShopRequestActions.loadStatistics, (state) => ({
    ...state,
    statistics: null,
    loaded: false
  })),
  on(BodyShopRequestActions.allDataLoaded, (state, { data }) =>
    bodyShopRequestAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(BodyShopRequestActions.allStatisticsLoaded, (state, { data }) => ({
    ...state,
    statistics: data,
    loaded: true
  })),
  on(BodyShopRequestActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: BodyShopRequestState, action: Action) {
  return bodyShopRequestReducer(state, action);
}
