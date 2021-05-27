import { Action, createReducer, on } from '@ngrx/store';
import { OperatorTrafficFineActions } from './operator-traffic-fine.actions';
import {
  initialState,
  trafficFineAdapter,
  IOperatorTrafficFineState
} from './operator-traffic-fine.entity';

const operatorTrafficFineReducer = createReducer(
  initialState,
  on(OperatorTrafficFineActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(OperatorTrafficFineActions.allDataLoaded, (state, { data }) =>
    trafficFineAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),

  on(OperatorTrafficFineActions.count, (state, { data }) => ({
    ...state,
    resultNumber: data
  })),

  on(OperatorTrafficFineActions.statisticsLoaded, (state, data) => ({
    ...state,
    statistics: data.data
  })),

  on(OperatorTrafficFineActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  on(OperatorTrafficFineActions.resetParams, (state) => ({
    ...state,
    error: null,
    submitted: false,
    message: null
  })),
);

export function reducer(state: IOperatorTrafficFineState, action: Action) {
  return operatorTrafficFineReducer(state, action);
}
