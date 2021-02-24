import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMovementRequest } from '@models/movement'
export const FLEET_MOVEMENT_REQUESTS_FEATURE_KEY = 'movementRequests';



export interface MovementRequestsState
  extends EntityState<IMovementRequest> {
  error?: any;
  loaded?: boolean;
  message?: string;
}
export interface MovementRequestsPartialState {
  [FLEET_MOVEMENT_REQUESTS_FEATURE_KEY]: MovementRequestsState;
}

export const movementRequestsAdapter: EntityAdapter<IMovementRequest> = createEntityAdapter<
  IMovementRequest
>();

export const initialState: MovementRequestsState = movementRequestsAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as MovementRequestsState
);
