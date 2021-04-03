import { Action, createReducer, on } from '@ngrx/store';
import { MovementRequestsActionsTemporary } from './movement-requests.actions';
import {
  initialState,
  movementRequestsTemporaryAdapter,
  MovementRequestsState
} from './movement-requests.entity';

const movementTemporaryRequestsReducer = createReducer(
  initialState,
  on(MovementRequestsActionsTemporary.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(MovementRequestsActionsTemporary.allDataLoaded, (state, { data }) =>
    movementRequestsTemporaryAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),

  on(MovementRequestsActionsTemporary.loadStatistic, (state) => ({
    ...state,
    statistic: null,
    loaded: false
  })),

  on(
    MovementRequestsActionsTemporary.statisticRequestLoaded,
    (state, { data }) =>
      movementRequestsTemporaryAdapter.setOne(data, {
        ...state,
        statistic: data,
        loaded: true
      })
  ),

  on(MovementRequestsActionsTemporary.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  on(
    MovementRequestsActionsTemporary.addMovementRequest,
    (state, { data }) => ({
      ...state,
      submitted: false
    })
  ),

  on(
    MovementRequestsActionsTemporary.movementRequestAddedSuccessfully,
    (state, { data }) =>
      movementRequestsTemporaryAdapter.addOne(data, {
        ...state,
        submitted: true
      })
  ),

  on(
    MovementRequestsActionsTemporary.editMovementRequest,
    (state, { data }) => ({
      ...state,
      submitted: false
    })
  ),

  on(
    MovementRequestsActionsTemporary.movementRequestEditedSuccessfully,
    (state, { data }) =>
      movementRequestsTemporaryAdapter.updateOne(
        { changes: data, id: data.id },
        { ...state, submitted: true }
      )
  ),

  on(MovementRequestsActionsTemporary.reject, (state, { data }) => ({
    ...state,
    rejected: false
  })),
  on(MovementRequestsActionsTemporary.reset, (state) => ({
    ...state,
    assigned: null,
    rejected: null,
    submitted: false,
    error: null,
    message: null
  })),
  on(
    MovementRequestsActionsTemporary.rejectSuccessfully,
    (state, { data }) => ({
      ...state,
      rejected: true
    })
  ),

  on(MovementRequestsActionsTemporary.assign, (state, { data }) => ({
    ...state,
    assigned: false
  })),

  on(
    MovementRequestsActionsTemporary.assignSuccessfully,
    (state, { data }) => ({
      ...state,
      assigned: true
    })
  )
);

export function reducer(state: MovementRequestsState, action: Action) {
  return movementTemporaryRequestsReducer(state, action);
}
