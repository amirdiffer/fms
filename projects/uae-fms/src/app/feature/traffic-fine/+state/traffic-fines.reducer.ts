import * as trafficFineTableReducer from './traffic-fine/traffic-fine-table.reducer';
import * as assetTrafficFineReducer from './asset-traffic-fine/asset-traffic-fine.reducer'
import { TRAFFIC_FINES_TRAFFIC_FINE_TABLE_FEATURE_KEY } from './traffic-fine/traffic-fine-table.entity';
import { TRAFFIC_FINES_ASSET_TRAFFIC_FINE_TABLE_FEATURE_KEY } from './asset-traffic-fine/asset-traffic-fine.entity';

export const reducers = {
  [TRAFFIC_FINES_TRAFFIC_FINE_TABLE_FEATURE_KEY]:trafficFineTableReducer.reducer,
  [TRAFFIC_FINES_ASSET_TRAFFIC_FINE_TABLE_FEATURE_KEY] : assetTrafficFineReducer.reducer
};
