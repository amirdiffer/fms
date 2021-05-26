import { Action, createReducer, on } from '@ngrx/store';
import { OperatorMovementHistoryActions } from './operator-movement-history.actions';
import {
  initialState,
  movementHistoryAdapter,
  IOperatorMovementHistoryState
} from './operator-movement-history.entity';

const operatorMovementHistoryReducer = createReducer(
  initialState,
  on(OperatorMovementHistoryActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(OperatorMovementHistoryActions.allDataLoaded, (state, { data }) =>
    movementHistoryAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),

  on(OperatorMovementHistoryActions.count, (state, { data }) => ({
    ...state,
    resultNumber: data
  })),

  on(OperatorMovementHistoryActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  on(OperatorMovementHistoryActions.resetParams, (state) => ({
    ...state,
    error: null,
    submitted: false,
    message: null
  })),
);

export function reducer(state: IOperatorMovementHistoryState, action: Action) {
  return operatorMovementHistoryReducer(state, action);
}
