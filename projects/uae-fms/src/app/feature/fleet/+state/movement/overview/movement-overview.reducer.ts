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

  on(MovementOverviewActions.count, (state, { data }) => ({
    ...state,
    resultNumber: data
  })),
  on(MovementOverviewActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: MovementOverviewState, action: Action) {
  return movementOverviewReducer(state, action);
}
