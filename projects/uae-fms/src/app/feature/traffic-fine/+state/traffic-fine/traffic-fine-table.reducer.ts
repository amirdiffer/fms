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
  }))
);

export function reducer(state: TrafficFineTableState, action: Action) {
  return trafficFineTableReducer(state, action);
}
