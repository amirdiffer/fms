import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FLEET_MOVEMENT_REQUESTS_FEATURE_KEY = 'movementRequests';

export interface MovementRequestsStateModel {
  id: number;
  movementType: string;
  requestType: string;
  assetType: string;
  reason: string;
  date: string;
  requestStatus: string;
}

export interface MovementRequestsState
  extends EntityState<MovementRequestsStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface MovementRequestsPartialState {
  [FLEET_MOVEMENT_REQUESTS_FEATURE_KEY]: MovementRequestsState;
}

export const movementRequestsAdapter: EntityAdapter<MovementRequestsStateModel> = createEntityAdapter<
  MovementRequestsStateModel
>();

export const initialState: MovementRequestsState = movementRequestsAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as MovementRequestsState
);
