import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Dashboard } from "@models/dashboard";

export const Dashboard_FEATURE_KEY = 'dashboard';

export interface DashboardState extends Dashboard {
  error?: any;
  loaded: boolean;
  message: string;
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
  error: null
} as DashboardState);
