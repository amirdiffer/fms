import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMovementRequest } from '@models/movement'
import { IMovementStatistics } from '@models/statistics';
export const FLEET_MOVEMENT_REQUESTS_FEATURE_KEY = 'movementRequests';


export interface MovementRequestsState extends EntityState<IMovementRequest>{
  error?: any;
  loaded?: boolean;
  message?: string;
}
export interface IMovementStatisticsState extends EntityState<IMovementStatistics>{
  statisticLoaded?: boolean;
}
export interface IAllMovementRequestState {
  movementRequest:MovementRequestsState;
  movementStatistic:IMovementStatisticsState;
}
export interface MovementRequestsPartialState {
  [FLEET_MOVEMENT_REQUESTS_FEATURE_KEY]: IAllMovementRequestState;
}

export const movementRequestsAdapter: EntityAdapter<IMovementRequest> = createEntityAdapter<
IMovementRequest
>();
export const movementRequestStatisticAdapter: EntityAdapter<IMovementStatistics> = createEntityAdapter<IMovementStatistics>();

const requestInitialState: MovementRequestsState = movementRequestsAdapter.getInitialState({
    error: null,
    loaded: null,
    message: null
} as MovementRequestsState);
const statisticInitialState : IMovementStatisticsState = movementRequestStatisticAdapter.getInitialState({
  statisticLoaded:null
})
export const initialState :IAllMovementRequestState ={
  movementRequest:requestInitialState,
  movementStatistic:statisticInitialState
}
// export const initialState: MovementRequestsState = movementRequestsAdapter.getInitialState(
//   {
//     error: null,
//     loaded: null,
//     statisticLoaded: null,
//     message: null
//   }  as MovementRequestsState
// );
