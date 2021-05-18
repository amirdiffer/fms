import { Action, createReducer, on } from '@ngrx/store';
import { OrderListActions } from '@feature/part-store/+state/order-list/order/order.actions';
import {
  initialState,
  orderListAdapter,
  OrderListState
} from '@feature/part-store/+state/order-list/order/order.entity';

const OrderListReducer = createReducer(
  initialState,
  /* '''''Load''''' order For Asset and Sub Asset */
  on(OrderListActions.loadOrderPartforAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(OrderListActions.allOrderListForAssetLoaded, (state, { data }) =>
    orderListAdapter.setAll(data, 
      { ...state, 
        loaded: true, 
        error: null 
      }
    )
  ),

  on(OrderListActions.loadOrderPartforSubAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(OrderListActions.allOrderListForSubAssetLoaded, (state, { data }) =>
    orderListAdapter.setAll(data, 
      { ...state, 
        loaded: true, 
        error: null 
      }
    )
  ),


  /* '''''Load''''' statistics of order For Asset and Sub Asset */
  on(OrderListActions.loadStatisticsOfOrderPartforAsset, (state) => ({
    ...state,
    loaded:false,
    error: null,
    message: null,
    statistics: null
  })),

  on(OrderListActions.allStatisticsOfOrderListForAssetLoaded, (state, { data }) => ({
    ...state,
    loaded:true,
    statistics: data
  })),

  on(OrderListActions.loadStatisticsOfOrderPartforSubAsset, (state) => ({
    ...state,
    loaded:false,
    error: null,
    message: null,
    statistics: null
  })),

  on(OrderListActions.allStatisticsOfOrderListForSubAssetLoaded, (state, { data }) => ({
    ...state,
    loaded:true,
    statistics: data
  })),



  /* ''''''Add'''''' Order For Asset and Sub Asset */
  on(OrderListActions.addOrderPartAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(OrderListActions.orderOfAssetPartAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(OrderListActions.addOrderPartSubAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(OrderListActions.orderOfSubAssetPartAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),




  /* '''''Get''''' Specific order for asset and sub asset */
  on(OrderListActions.getSpecificOrderPartAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(OrderListActions.specificOrderPartOfAssetLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificOrder: data
  })),

  on(OrderListActions.getSpecificOrderPartSubAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(OrderListActions.specificOrderPartOfSubAssetLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificOrder: data
  })),


  /* '''''Update''''' order of Asset and Sub Asset*/
  on(OrderListActions.updateOrderOfAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(OrderListActions.orderOfAssetUpdatedSuccessfully, (state, { data }) =>
    orderListAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),

  on(OrderListActions.updateOrderOfSubAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(OrderListActions.orderOfSubAssetUpdatedSuccessfully, (state, { data }) =>
    orderListAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),

  /* '''''Receive''''' Specific order for asset and sub asset */
  on(OrderListActions.receiveSpecificOrderPartAsset, (state, { data }) => ({
    ...state,
    loaded: false,
    error: null,
    message: null,
    submitted:false
  })),

  on(OrderListActions.specificOrderPartOfAssetReceivedSuccessfully, (state, { data }) => 
    orderListAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),

  on(OrderListActions.receiveSpecificOrderPartSubAsset, (state , { data }) => ({
    ...state,
    loaded: false,
    error: null,
    message: null,
    submitted:false
  })),

  on(OrderListActions.specificOrderPartOfSubAssetReceivedSuccessfully, (state, { data }) => 
    orderListAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),

   /* ERROR */
   on(OrderListActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  /* RESET */
  on(OrderListActions.reset, (state) => ({
    ...state,
    loaded: false,
    message: null,
    error: null,
    specificOrder:null,
    statistics:null,
    submitted:false,
  })),
);

export function reducer(state: OrderListState, action: Action) {
  return OrderListReducer(state, action);
}
