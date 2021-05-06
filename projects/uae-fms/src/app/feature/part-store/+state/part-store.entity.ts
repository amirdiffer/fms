import {
  PartMasterCategoryState,
  PartMasterItemState,
  PARTSTORE_PARTMASTER_CATEGORY_FEATURE_KEY,
  PARTSTORE_PARTMASTER_ITEM_FEATURE_KEY,
} from './part-master/part-master.entity';
import {
  PartListState,
  PARTSTORE_PARTLIST_FEATURE_KEY
} from './part-list/part-list.entity';
import {
  PARTSTORE_REQUEST_LIST_FEATURE_KEY,
  RequestListState
} from '@feature/part-store/+state/order-list/request-list/request-list.entity';
import {
  MyOrderListState,
  PARTSTORE_MY_ORDER_LIST_FEATURE_KEY
} from '@feature/part-store/+state/order-list/my-order/my-order.entity';
import {
  PARTSTORE_SUPPLIERS_LIST_FEATURE_KEY,
  SuppliersListState
} from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';

export const PARTSTORE_FEATURE_KEY = 'part-store';

export interface State {
  readonly [PARTSTORE_PARTLIST_FEATURE_KEY]: PartListState;
  readonly [PARTSTORE_REQUEST_LIST_FEATURE_KEY]: RequestListState;
  readonly [PARTSTORE_MY_ORDER_LIST_FEATURE_KEY]: MyOrderListState;
  readonly [PARTSTORE_SUPPLIERS_LIST_FEATURE_KEY]: SuppliersListState;
  readonly [PARTSTORE_PARTMASTER_CATEGORY_FEATURE_KEY]: PartMasterCategoryState;
  readonly [PARTSTORE_PARTMASTER_ITEM_FEATURE_KEY]: PartMasterItemState;
}

export interface PartStorePartialState {
  readonly [PARTSTORE_FEATURE_KEY]: State;
}
