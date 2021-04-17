import { Action, createReducer, on } from '@ngrx/store';
import { MovementOverviewActionsTemporary } from './movement-overview.actions';
import {
  initialState,
  movementOverviewAdapter,
  MovementOverviewState
} from './movement-overview.entity';

const movementTemporaryOverviewReducer = createReducer(
  initialState,
  on(MovementOverviewActionsTemporary.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(MovementOverviewActionsTemporary.allDataLoaded, (state, { data }) =>
    movementOverviewAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),

  on(MovementOverviewActionsTemporary.count, (state, { data }) => ({
    ...state,
    resultNumber:data
  })),

  on(MovementOverviewActionsTemporary.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: MovementOverviewState, action: Action) {
  return movementTemporaryOverviewReducer(state, action);
}
