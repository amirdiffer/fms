import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMovementRequest } from '@models/movement'
import { IMovementStatistics } from '@models/statistics';
export const FLEET_MOVEMENT_REQUESTS_FEATURE_KEY = 'movementRequests';



export interface MovementRequestsState
  extends EntityState<IMovementRequest> {
  error?: any;
  loaded?: boolean;
  statistic?: IMovementStatistics;
  message?: string;
  submitted?: boolean;
  rejected?: boolean;
  assigned?: boolean;
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
    message: null,
    statistic: null,
    submitted: false,
    rejected: false,
    assigned: false
  } as MovementRequestsState
);
