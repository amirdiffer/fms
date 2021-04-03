import { Action, createReducer, on } from '@ngrx/store';
import {
  initialState,
  bodyShopRequestAdapter,
  BodyShopRequestState
} from './body-shop-request.entity';
import { BodyShopRequestActions } from './body-shop-request.actions';
import { state } from '@angular/animations';

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
  on(BodyShopRequestActions.addRequest, (state, { data: IRequest }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(BodyShopRequestActions.requestAddedSuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  })),
  on(BodyShopRequestActions.editRequest, (state, { request }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(BodyShopRequestActions.requestEditedSuccessfully, (state, { request }) =>
    bodyShopRequestAdapter.updateOne(
      { changes: request, id: request.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),
  on(BodyShopRequestActions.resetParams, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
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
