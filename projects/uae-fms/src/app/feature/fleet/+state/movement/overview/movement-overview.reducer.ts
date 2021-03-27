import { Action, createReducer, on } from '@ngrx/store';
import { MovementOverviewActions } from './movement-overview.actions';
import {
  initialState,
  movementOverviewAdapter,
  MovementOverviewState
} from './movement-overview.entity';

const movementOverviewReducer = createReducer(
  initialState,
  on(MovementOverviewActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(MovementOverviewActions.allDataLoaded, (state, { data }) =>
    movementOverviewAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),

  on(MovementOverviewActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  on(MovementOverviewActions.addMovementRequest, (state, { data }) => ({
    ...state,
    loaded: false
  })),

  on(MovementOverviewActions.movementRequestAddedSuccessfully, (state, { data }) =>
    movementOverviewAdapter.addOne(data, { ...state, submitted: true })
  ),

  on(MovementOverviewActions.editMovementRequest, (state, { data }) => ({
    ...state,
    loaded: false
  })),

  on(MovementOverviewActions.movementRequestEditedSuccessfully, (state, { data }) =>
    movementOverviewAdapter.updateOne({ changes: data, id: data.id }, state)
  )

);

export function reducer(state: MovementOverviewState, action: Action) {
  return movementOverviewReducer(state, action);
}
