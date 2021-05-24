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
  on(BodyShopRequestActions.allDataLoaded, (state, { data }) =>
    bodyShopRequestAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),

  on(BodyShopRequestActions.count, (state, { data }) => ({
    ...state,
    resultNumber: data
  })),


  /* Request By Id */
  on(BodyShopRequestActions.loadAllRequestsById, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(BodyShopRequestActions.requestsByIdDataLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    requests: data
  })),

  /* Get Specific Request */
  on(BodyShopRequestActions.getSpecificRequest, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null,
    specificRequest:null
  })),
  on(BodyShopRequestActions.specificRequestLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificRequest: data
  })),

  /* Request By AssetIdd */
  on(BodyShopRequestActions.loadAllRequestByAssetId, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(BodyShopRequestActions.allRequestByAssetIdLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    assetRequest: data
  })),

  /* Statistics */
  on(BodyShopRequestActions.loadStatistics, (state) => ({
    ...state,
    statistics: null,
    loaded: false
  })),

  on(BodyShopRequestActions.allStatisticsLoaded, (state, { data }) => ({
    ...state,
    statistics: data,
    loaded: true
  })),

  /* Post Request */
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

  /* Update Request */
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

  /* Error */
  on(BodyShopRequestActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  /* Reset */
  on(BodyShopRequestActions.resetParams, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  }))
);

export function reducer(state: BodyShopRequestState, action: Action) {
  return bodyShopRequestReducer(state, action);
}
