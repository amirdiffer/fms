import { Action, createReducer, on } from '@ngrx/store';
import { ServiceShopRequestActions } from './service-shop-request.actions';
import { ServiceShopRequestState , initialState,serviceShopRequestAdapter } from './service-shop-request.entity';


const serviceShopRequestReducer = createReducer(
  initialState,
  on(ServiceShopRequestActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(ServiceShopRequestActions.allDataLoaded, (state, { data }) =>
    serviceShopRequestAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  /* Request By Id */
  on(ServiceShopRequestActions.loadAllRequestsById, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(ServiceShopRequestActions.requestsByIdDataLoaded, (state, { data }) =>
    ({ ...state, loaded: true, error: null, requests: data })
  ),


  /* Request By AssetIdd */
  on(ServiceShopRequestActions.loadAllRequestByAssetId, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(ServiceShopRequestActions.allRequestByAssetIdLoaded, (state, { data }) =>
    ({ ...state, loaded: true, error: null, assetRequest: data })
  ),


  /* Statistics */
  on(ServiceShopRequestActions.loadStatistics, (state) => ({
    ...state,
    statistics: null,
    loaded: false
  })),
  
  on(ServiceShopRequestActions.allStatisticsLoaded, (state, { data }) => ({
    ...state,
    statistics: data,
    loaded: true
  })),


  /* Post Request */
  on(ServiceShopRequestActions.addRequest, (state, { data: IRequest }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(ServiceShopRequestActions.requestAddedSuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  })),

  /* Update Request */
  on(ServiceShopRequestActions.editRequest, (state, { request }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(ServiceShopRequestActions.requestEditedSuccessfully, (state, { request }) =>
  serviceShopRequestAdapter.updateOne(
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
  on(ServiceShopRequestActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  /* Reset */
  on(ServiceShopRequestActions.resetParams, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  }))
);

export function reducer(state: ServiceShopRequestState, action: Action) {
  return serviceShopRequestReducer(state, action);
}
