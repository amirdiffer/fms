import {
  IAssetTrafficFineState,
  TRAFFIC_FINES_ASSET_TRAFFIC_FINE_TABLE_FEATURE_KEY
} from './asset-traffic-fine/asset-traffic-fine.entity';
import {
  TRAFFIC_FINES_TRAFFIC_FINE_TABLE_FEATURE_KEY,
  TrafficFineTableState
} from './traffic-fine/traffic-fine-table.entity';
export const TRAFFIC_FINES_FEATURE_KEY = 'traffic-fines';

export interface State {
  readonly [TRAFFIC_FINES_TRAFFIC_FINE_TABLE_FEATURE_KEY]: TrafficFineTableState;
  readonly [TRAFFIC_FINES_ASSET_TRAFFIC_FINE_TABLE_FEATURE_KEY]: IAssetTrafficFineState;
}

export interface TrafficFinePartialState {
  readonly [TRAFFIC_FINES_FEATURE_KEY]: State;
}
