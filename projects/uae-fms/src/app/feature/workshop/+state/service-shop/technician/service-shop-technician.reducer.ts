import { Action, createReducer, on } from '@ngrx/store';
import { ServiceShopTechnicianActions } from './service-shop-technician.actions';
import { IServiceShopTechnicianState, serviceShopTechnicianAdapter , initialState} from './service-shop-technician.entity';


const serviceShopTechnicianReducer = createReducer(
  initialState,
  on(ServiceShopTechnicianActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(ServiceShopTechnicianActions.allDataLoaded, (state, { data }) =>
    serviceShopTechnicianAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),

  on(ServiceShopTechnicianActions.count, (state, { data }) => ({
    ...state,
    resultNumber:data
  })),

  on(
    ServiceShopTechnicianActions.addTechnician,
    (state, { data: ITechnician }) => ({
      ...state,
      submitted: false
    })
  ),
  on(
    ServiceShopTechnicianActions.technicianAddedSuccessfully,
    (state, { data }) => ({
      ...state,
      error: null,
      message: null,
      submitted: true
    })
  ),
  on(ServiceShopTechnicianActions.resetParams, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(ServiceShopTechnicianActions.editTechnician, (state, { technician }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(
    ServiceShopTechnicianActions.technicianEditedSuccessfully,
    (state, { technician }) =>
    serviceShopTechnicianAdapter.updateOne(
        { changes: technician, id: technician.id },
        {
          ...state,
          error: null,
          message: null,
          submitted: true
        }
      )
  ),

  on(ServiceShopTechnicianActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: IServiceShopTechnicianState, action: Action) {
  return serviceShopTechnicianReducer(state, action);
}
