import { Action, createReducer, on } from '@ngrx/store';
import { MovementRequestsActionsTemporary } from './movement-requests.actions';
import {
  initialState,
  movementRequestsAdapter,
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
    movementRequestsAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),

  on(MovementRequestsActionsTemporary.loadStatistic, (state) => ({
    ...state,
    statistic: null,
    loaded: false,
  })),

  on(MovementRequestsActionsTemporary.statisticRequestLoaded, (state, { data }) =>
    movementRequestsAdapter.setOne(data, {
      ...state,
      statistic: data,
      loaded: true,
    })
  ),

  on(MovementRequestsActionsTemporary.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  on(MovementRequestsActionsTemporary.addMovementRequest, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(MovementRequestsActionsTemporary.movementRequestAddedSuccessfully, (state, { data }) =>
    movementRequestsAdapter.addOne(data, { ...state, submitted: true })
  ),

  on(MovementRequestsActionsTemporary.editMovementRequest, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(MovementRequestsActionsTemporary.movementRequestEditedSuccessfully, (state, { data }) =>
    movementRequestsAdapter.updateOne({ changes: data, id: data.id }, { ...state, submitted: true })
  ),

  on(MovementRequestsActionsTemporary.reject, (state, { data }) => ({
    ...state,
    rejected: false
  })),
  on(MovementRequestsActionsTemporary.reset, (state) => ({
    ...state,
    assigned: null,
    rejected: null,
    submitted: null,
    error: null,
    message: null
  })),
  on(MovementRequestsActionsTemporary.rejectSuccessfully, (state, { data }) => ({
    ...state,
    rejected: true
  })
  ),

  on(MovementRequestsActionsTemporary.assign, (state, { data }) => ({
    ...state,
    assigned: false
  })),

  on(MovementRequestsActionsTemporary.assignSuccessfully, (state, { data }) => ({
    ...state,
    assigned: true
  })
  )
);

export function reducer(state: MovementRequestsState, action: Action) {
  return movementTemporaryRequestsReducer(state, action);
}
