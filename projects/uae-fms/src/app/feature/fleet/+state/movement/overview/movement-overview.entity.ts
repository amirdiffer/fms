import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY = 'movementOverview';

export interface MovementOverviewStateModel {
  id: number;
  asset: string;
  duration: string;
  startDate: string;
  department: string;
  operator: string;
  fine: number;
  reason: string;
}

export interface MovementOverviewState
  extends EntityState<MovementOverviewStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface MovementOverviewPartialState {
  [FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY]: MovementOverviewState;
}

export const movementOverviewAdapter: EntityAdapter<MovementOverviewStateModel> = createEntityAdapter<
  MovementOverviewStateModel
>();

export const initialState: MovementOverviewState = movementOverviewAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as MovementOverviewState
);
