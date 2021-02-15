import {
  dashboardAdapter,
  DashboardState,
  initialState
} from './dashboard.entity';
import { DashboardActions } from './dashboard.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(DashboardActions.allDataLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    dashboard: data.dashboard
  })),
  on(DashboardActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: DashboardState, action: Action) {
  return dashboardReducer(state, action);
}
