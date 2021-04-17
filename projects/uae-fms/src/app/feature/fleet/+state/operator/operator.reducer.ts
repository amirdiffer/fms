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
  on(OperatorActions.statisticsLoaded, (state, data) => ({
    ...state,
    statistics: data.data
  })),
  on(OperatorActions.addOperator, (state, { data: IOperator }) => ({
    ...state,
    submitted: false,
    error: null
  })),
  on(OperatorActions.operatorAddedSuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  })),

  on(OperatorActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  on(OperatorActions.resetParams, (state) => ({
    ...state,
    error: null,
    submitted: false,
    message: null
  })),
  on(OperatorActions.editOperator, (state, { operator }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(OperatorActions.operatorEditedSuccessfully, (state, { operator }) =>
    operatorAdapter.updateOne(
      { changes: operator, id: operator.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  )
);

export function reducer(state: IOperatorState, action: Action) {
  return operatorReducer(state, action);
}
