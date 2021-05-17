import { Action, createReducer, on } from '@ngrx/store';
import { RequestListActions } from '@feature/part-store/+state/order-list/request/request-list.actions';
import {
  initialState,
  requestListAdapter,
  RequestListState
} from '@feature/part-store/+state/order-list/request/request-list.entity';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';

const RequestListReducer = createReducer(
  initialState,
  /* '''''Load''''' Requets For Asset and Sub Asset */
  on(RequestListActions.loadRequestPartforAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(RequestListActions.allRequestListForAssetLoaded, (state, { data }) =>
    requestListAdapter.setAll(data, 
      { ...state, 
        loaded: true, 
        error: null 
      }
    )
  ),

  on(RequestListActions.loadRequestPartforSubAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(RequestListActions.allRequestListForSubAssetLoaded, (state, { data }) =>
    requestListAdapter.setAll(data, 
      { ...state, 
        loaded: true, 
        error: null 
      }
    )
  ),


  /* '''''Load''''' statistics of request For Asset and Sub Asset */
  on(RequestListActions.loadStatisticsOfRequestPartforAsset, (state) => ({
    ...state,
    loaded:false,
    error: null,
    message: null,
    statistics: null
  })),

  on(RequestListActions.allStatisticsOfRequestListForAssetLoaded, (state, { data }) => ({
    ...state,
    loaded:true,
    statistics: data
  })),

  on(RequestListActions.loadStatisticsOfRequestPartforSubAsset, (state) => ({
    ...state,
    loaded:false,
    error: null,
    message: null,
    statistics: null
  })),

  on(RequestListActions.allStatisticsOfRequestListForSubAssetLoaded, (state, { data }) => ({
    ...state,
    loaded:true,
    statistics: data
  })),



  /* ''''''Add'''''' Requet For Asset and Sub Asset */
  on(RequestListActions.addRequestPartAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(RequestListActions.requestOfAssetPartAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(RequestListActions.addRequestPartSubAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(RequestListActions.requestOfSubAssetPartAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),




  /* '''''Get''''' Specific request for asset and sub asset */
  on(RequestListActions.getSpecificRequestPartAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(RequestListActions.specificRequestPartOfAssetLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificRequest: data
  })),

  on(RequestListActions.getSpecificRequestPartSubAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(RequestListActions.specificRequestPartOfSubAssetLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificRequest: data
  })),


  /* '''''Update''''' Request of Asset and Sub Asset*/
  on(RequestListActions.updateRequestOfAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(RequestListActions.requestOfAssetUpdatedSuccessfully, (state, { data }) =>
    requestListAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),

  on(RequestListActions.updateRequestOfSubAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(RequestListActions.requestOfSubAssetUpdatedSuccessfully, (state, { data }) =>
    requestListAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),


  /* '''''Approve''''' Request of Asset and Sub Asset*/
  on(RequestListActions.approveSpecificRequestPartofAsset, (state) => ({
    ...state,
    error: null,
    message: null,
    approved:false

  })),

  on(RequestListActions.specificRequestPartOfAssetApprovedSuccessfully, (state) => ({
    ...state,
    error: null,
    approved:true,
  })),

  on(RequestListActions.approveSpecificRequestPartofSubAsset, (state) => ({
    ...state,
    error: null,
    message: null,
    approved:false,
  })),

  on(RequestListActions.specificRequestPartOfSubAssetApprovedSuccessfully, (state) => ({
    ...state,
    error: null,
    approved:true,
  })),



  /* '''''Reject''''' Request of Asset and Sub Asset*/
  on(RequestListActions.rejectSpecificRequestPartofAsset, (state) => ({
    ...state,
    error: null,
    message: null,
    rejected:false,
  })),

  on(RequestListActions.specificRequestPartOfAssetRejectedSuccessfully, (state) => ({
    ...state,
    error: null,
    rejected:true,
  })),

  on(RequestListActions.rejectSpecificRequestPartofSubAsset, (state) => ({
    ...state,
    error: null,
    message: null,
    rejected:false,
  })),

  on(RequestListActions.specificRequestPartOfSubAssetRejectedSuccessfully, (state) => ({
    ...state,
    error: null,
    rejected:true,
  })),


   /* ERROR */
   on(RequestListActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  /* RESET */
  on(RequestListActions.reset, (state) => ({
    ...state,
    loaded: false,
    message: null,
    error: null,
    specificRequest:null,
    statistics:null,
    submitted:false,
    approved:false,
    rejected:false,
  })),
);

export function reducer(state: RequestListState, action: Action) {
  return RequestListReducer(state, action);
}
