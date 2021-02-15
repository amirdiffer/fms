import * as movementOverviewReducer from './movement/overview/movement-overview.reducer';
import * as movementRequestsReducer from './movement/requests/movement-requests.reducer';
import { FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY } from './movement/overview/movement-overview.entity';
import { FLEET_MOVEMENT_REQUESTS_FEATURE_KEY } from './movement/requests/movement-requests.entity';

export const reducers = {
  [FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY]: movementOverviewReducer.reducer,
  [FLEET_MOVEMENT_REQUESTS_FEATURE_KEY]: movementRequestsReducer.reducer
};
