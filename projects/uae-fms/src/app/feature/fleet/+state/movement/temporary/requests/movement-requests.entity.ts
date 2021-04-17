import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMovementRequest } from '@models/movement';
import { IMovementStatistics } from '@models/statistics';
export const FLEET_MOVEMENT_TEMPORARY_REQUESTS_FEATURE_KEY =
  'movementRequestsTemporary';

export interface MovementRequestsState extends EntityState<IMovementRequest> {
  error?: any;
  loaded?: boolean;
  statistic?: IMovementStatistics;
  message?: string;
  submitted?: boolean;
  rejected?: boolean;
  assigned?: boolean;
  resultNumber?:number

}
export interface MovementRequestsPartialState {
  [FLEET_MOVEMENT_TEMPORARY_REQUESTS_FEATURE_KEY]: MovementRequestsState;
}

export const movementRequestsTemporaryAdapter: EntityAdapter<IMovementRequest> = createEntityAdapter<IMovementRequest>();

export const initialState: MovementRequestsState = movementRequestsTemporaryAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null,
    statistic: null,
    submitted: false,
    rejected: null,
    assigned: null,
    resultNumber:0

  } as MovementRequestsState
);
