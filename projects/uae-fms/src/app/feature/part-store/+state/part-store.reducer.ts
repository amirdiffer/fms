import { PARTSTORE_ORDERLIST_FEATURE_KEY } from './order-list/order-list.entity';
import { PARTSTORE_PARTLIST_FEATURE_KEY } from './part-list/part-list.entity';
import { PARTSTORE_PARTMASTER_FEATURE_KEY } from './part-master/part-master.entity';
import * as orderListReducer from './order-list/order-list.reducer';
import * as partListReducer from './part-list/part-list.reducer';
import * as partMasterReducer from './part-master/part-master.reducer';

export const reducers = {
  [PARTSTORE_PARTLIST_FEATURE_KEY]: partListReducer.reducer,
  [PARTSTORE_PARTMASTER_FEATURE_KEY]: partMasterReducer.reducer,
  [PARTSTORE_ORDERLIST_FEATURE_KEY]: orderListReducer.reducer
};
