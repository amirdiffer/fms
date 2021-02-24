import { Action, createReducer, on } from '@ngrx/store';
import { MovementRequestsActions } from './movement-requests.actions';
import {
  initialState,
  movementRequestsAdapter,
  MovementRequestsState,
  movementRequestStatisticAdapter,
} from './movement-requests.entity';

const movementRequestsReducer = createReducer(
  initialState,
  on(MovementRequestsActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    statisticLoaded:null,
    error: null,
    message: null
  })),

  on(MovementRequestsActions.allDataLoaded, (state, { data }) =>
    movementRequestsAdapter.setAll(data, {
      ...state,
      loaded: true,
      statisticLoaded:null,
      error: null
    })
  ),

  on(MovementRequestsActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    statisticLoaded:null,
    loaded: true
  })),
  on(MovementRequestsActions.statisticloadAll ,  (state) => ({
    ...state,
    loaded: null,
    statisticLoaded:false,
    error: null,
    message: null
  })),
  on(MovementRequestsActions.allStatisticloaded, (state, { data }) =>
    movementRequestStatisticAdapter.setAll(data, {
    ...state,
    loaded: null,
    statisticLoaded:true,
    error: null
  })
),
);

export function reducer(state: MovementRequestsState, action: Action) {
  return movementRequestsReducer(state, action);
}
