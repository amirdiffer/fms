import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

export const Dashboard_FEATURE_KEY = 'dashboard';

export interface DashboardState {
  error?: any;
  loaded: boolean;
  message: string;
  dashboard: object;
}

export interface DashboardPartialState {
  [Dashboard_FEATURE_KEY]: DashboardState;
}

export const dashboardAdapter: EntityAdapter<DashboardState> = createEntityAdapter<
  DashboardState
>();

export const initialState: DashboardState = dashboardAdapter.getInitialState({
  loaded: null,
  message: null,
  error: null,
  dashboard: null
} as DashboardState);
