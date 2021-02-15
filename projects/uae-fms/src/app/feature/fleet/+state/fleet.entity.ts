import {
  FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY,
  MovementOverviewState
} from './movement/overview/movement-overview.entity';

export const FLEET_FEATURE_KEY = 'fleet';

export interface State {
  readonly [FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY]: MovementOverviewState;
}

export interface MovementOverviewPartialState {
  readonly [FLEET_FEATURE_KEY]: State;
}
