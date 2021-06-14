import { Action, createReducer, on } from '@ngrx/store';
import { TrafficFineTableActions } from './traffic-fine-table.actions';
import {
  initialState,
  trafficFineTableAdapter,
  TrafficFineTableState
} from './traffic-fine-table.entity';
import { AssetMasterActions } from '@feature/fleet/+state/assets/asset-master/asset-master.actions';

const trafficFineTableReducer = createReducer(
  initialState,
  on(TrafficFineTableActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(TrafficFineTableActions.allDataLoaded, (state, { data }) =>
    trafficFineTableAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),
  on(TrafficFineTableActions.statisticsLoaded, (state, data) => ({
    ...state,
    statistics: data.data
  })),
  on(TrafficFineTableActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),


  /* Get Vehicle Information by plate number */
  on(TrafficFineTableActions.getVehicleInformationByPlateNumber, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    loaded: false,
    vehicleInfo:null
  })),
  on(TrafficFineTableActions.vehicleInformationByPlateNumberLoadedSuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    loaded: true,
    vehicleInfo:data
  })),


   /* Get Vehicle Information by chassis number */
  on(TrafficFineTableActions.getVehicleInformationByChassisNumber, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    loaded: false,
    vehicleInfo:null
  })),
  on(TrafficFineTableActions.vehicleInformationByChassisNumberLoadedSuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    loaded: true,
    vehicleInfo:data
  })),
);

export function reducer(state: TrafficFineTableState, action: Action) {
  return trafficFineTableReducer(state, action);
}
