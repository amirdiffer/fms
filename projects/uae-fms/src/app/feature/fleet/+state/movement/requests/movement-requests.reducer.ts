import { Action, createReducer, on } from '@ngrx/store';
import { MovementRequestsActions } from './movement-requests.actions';
import {
  initialState,
  movementRequestsAdapter,
  MovementRequestsState
} from './movement-requests.entity';
import { MovementOverviewActions } from '@feature/fleet/+state/movement/overview/movement-overview.actions';
import { movementOverviewAdapter } from '@feature/fleet/+state/movement/overview/movement-overview.entity';

const movementRequestsReducer = createReducer(
  initialState,
  on(MovementRequestsActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(MovementRequestsActions.allDataLoaded, (state, { data }) =>
    movementRequestsAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),

  on(MovementRequestsActions.loadStatistic, (state) => ({
    ...state,
    statistic: null,
    loaded: false,
  })),

  on(MovementRequestsActions.statisticRequestLoaded, (state, { data }) =>
    movementRequestsAdapter.setOne(data, {
      ...state,
      statistic: data,
      loaded: true,
    })
  ),

  on(MovementRequestsActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  on(MovementRequestsActions.addMovementRequest, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(MovementRequestsActions.movementRequestAddedSuccessfully, (state, { data }) =>
    movementRequestsAdapter.addOne(data, { ...state, submitted: true })
  ),

  on(MovementRequestsActions.editMovementRequest, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(MovementRequestsActions.movementRequestEditedSuccessfully, (state, { data }) =>
    movementRequestsAdapter.updateOne({ changes: data, id: data.id }, { ...state, submitted: true })
  ),

  on(MovementRequestsActions.reject, (state, { data }) => ({
    ...state,
    rejected: false
  })),
  on(MovementRequestsActions.reset, (state) => ({
    ...state,
    assigned: false,
    submitted: false,
    error: null,
    message: null
  })),
  on(MovementRequestsActions.rejectSuccessfully, (state, { data }) => ({
    ...state,
    rejected: true
  })
  ),

  on(MovementRequestsActions.assign, (state, { data }) => ({
    ...state,
    assigned: false
  })),

  on(MovementRequestsActions.assignSuccessfully, (state, { data }) => ({
    ...state,
    assigned: true
  })
  )
);

export function reducer(state: MovementRequestsState, action: Action) {
  return movementRequestsReducer(state, action);
}
