import { PARTSTORE_PARTLIST_FEATURE_KEY } from './part-list/part-list.entity';
import { PARTSTORE_PARTMASTER_FEATURE_KEY } from './part-master/part-master.entity';
import * as requestListReducer from './order-list/request-list/request-list.reducer';
import * as myOrderReducer from './order-list/my-order/my-order.reducer';
import * as suppliersReducer from './order-list/suppliers/suppliers.reducer';
import * as partListReducer from './part-list/part-list.reducer';
import * as partMasterReducer from './part-master/part-master.reducer';
import { PARTSTORE_REQUEST_LIST_FEATURE_KEY } from '@feature/part-store/+state/order-list/request-list/request-list.entity';
import { PARTSTORE_MY_ORDER_LIST_FEATURE_KEY } from '@feature/part-store/+state/order-list/my-order/my-order.entity';
import { PARTSTORE_SUPPLIERS_LIST_FEATURE_KEY } from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';

export const reducers = {
  [PARTSTORE_PARTLIST_FEATURE_KEY]: partListReducer.reducer,
  [PARTSTORE_PARTMASTER_FEATURE_KEY]: partMasterReducer.reducer,
  [PARTSTORE_REQUEST_LIST_FEATURE_KEY]: requestListReducer.reducer,
  [PARTSTORE_MY_ORDER_LIST_FEATURE_KEY]: myOrderReducer.reducer,
  [PARTSTORE_SUPPLIERS_LIST_FEATURE_KEY]: suppliersReducer.reducer
};
