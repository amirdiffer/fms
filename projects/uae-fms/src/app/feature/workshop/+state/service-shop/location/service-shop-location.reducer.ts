import { Action, createReducer, on } from '@ngrx/store';
import { ServiceShopLocationActions } from './service-shop-location.actions';
import { IServiceShopLocationState, serviceShopLocationAdapter , initialState} from './service-shop-location.entity';



const serviceShopLocationReducer = createReducer(
  initialState,
  on(ServiceShopLocationActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(ServiceShopLocationActions.allDataLoaded, (state, { data }) =>
    serviceShopLocationAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),
  on(ServiceShopLocationActions.count, (state, { data }) => ({
    ...state,
    resultNumber:data
  })),
  on(
    ServiceShopLocationActions.addServiceShopLocation,
    (state, { data: IBodyShopLocation }) => ({
      ...state,
      submitted: false
    })
  ),
  on(
    ServiceShopLocationActions.serviceshopLocationAddedSuccessfully,
    (state, { data }) => ({
      ...state,
      error: null,
      message: null,
      submitted: true
    })
  ),
  on(ServiceShopLocationActions.resetParams, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(
    ServiceShopLocationActions.editServiceShopLocation,
    (state, { serviceShopLocation }) => ({
      ...state,
      error: null,
      message: null,
      submitted: false
    })
  ),
  on(
    ServiceShopLocationActions.serviceShopLocationEditedSuccessfully,
    (state, { serviceShopLocation }) =>
    serviceShopLocationAdapter.updateOne(
        { changes: serviceShopLocation, id: serviceShopLocation.id },
        {
          ...state,
          error: null,
          message: null,
          submitted: true
        }
      )
  ),
  on(ServiceShopLocationActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: IServiceShopLocationState, action: Action) {
  return serviceShopLocationReducer(state, action);
}
