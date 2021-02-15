import * as trafficFineTableReducer from './traffic-fine/traffic-fine-table.reducer';
import { TRAFFIC_FINES_TRAFFIC_FINE_TABLE_FEATURE_KEY } from './traffic-fine/traffic-fine-table.entity';

export const reducers = {
  [TRAFFIC_FINES_TRAFFIC_FINE_TABLE_FEATURE_KEY]:
    trafficFineTableReducer.reducer
};
