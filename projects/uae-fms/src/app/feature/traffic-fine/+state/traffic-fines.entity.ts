import {
  TRAFFIC_FINES_TRAFFIC_FINE_TABLE_FEATURE_KEY,
  TrafficFineTableState
} from './traffic-fine/traffic-fine-table.entity';
export const TRAFFIC_FINES_FEATURE_KEY = 'traffic-fines';

export interface State {
  readonly [TRAFFIC_FINES_TRAFFIC_FINE_TABLE_FEATURE_KEY]: TrafficFineTableState;
}

export interface TrafficFinePartialState {
  readonly [TRAFFIC_FINES_FEATURE_KEY]: State;
}
