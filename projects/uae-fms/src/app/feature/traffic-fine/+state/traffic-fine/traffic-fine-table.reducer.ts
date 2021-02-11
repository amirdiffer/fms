import { Action, createReducer, on } from '@ngrx/store';
import { TrafficFineTableActions } from './traffic-fine-table.actions';
import {
  initialState,
  trafficFineTableAdapter,
  TrafficFineTableState
} from './traffic-fine-table.entity';

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
  on(TrafficFineTableActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: TrafficFineTableState, action: Action) {
  return trafficFineTableReducer(state, action);
}
