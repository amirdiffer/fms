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
  on(BodyShopLocationActions.count, (state, { data }) => ({
    ...state,
    resultNumber: data
  })),
  on(
    BodyShopLocationActions.addBodyShopLocation,
    (state, { data: IBodyShopLocation }) => ({
      ...state,
      submitted: false
    })
  ),
  on(
    BodyShopLocationActions.bodyShopLocationAddedSuccessfully,
    (state, { data }) => ({
      ...state,
      error: null,
      message: null,
      submitted: true
    })
  ),
  on(BodyShopLocationActions.resetParams, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(
    BodyShopLocationActions.editBodyShopLocation,
    (state, { bodyShopLocation }) => ({
      ...state,
      error: null,
      message: null,
      submitted: false
    })
  ),
  on(
    BodyShopLocationActions.bodyShopLocationEditedSuccessfully,
    (state, { bodyShopLocation }) =>
      bodyShopLocationAdapter.updateOne(
        { changes: bodyShopLocation, id: bodyShopLocation.id },
        {
          ...state,
          error: null,
          message: null,
          submitted: true
        }
      )
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
