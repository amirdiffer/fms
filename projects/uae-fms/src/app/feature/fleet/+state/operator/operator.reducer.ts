import { Action, createReducer, on } from '@ngrx/store';
import { OperatorActions } from './operator.actions';
import {
  initialState,
  operatorAdapter,
  IOperatorState
} from './operator.entity';

const operatorReducer = createReducer(
  initialState,
  on(OperatorActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(OperatorActions.allDataLoaded, (state, { data }) =>
    operatorAdapter.setAll(data, {
    ...state,
    loaded: true,
    error: null
    })
  ),

  on(OperatorActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: IOperatorState, action: Action) {
  return operatorReducer(state, action);
}
