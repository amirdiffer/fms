import { Action, createReducer, on } from '@ngrx/store';
import { MovementRequestsActions } from './movement-requests.actions';
import {
  initialState,
  movementRequestsAdapter,
  MovementRequestsState
} from './movement-requests.entity';

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

  on(MovementRequestsActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: MovementRequestsState, action: Action) {
  return movementRequestsReducer(state, action);
}
