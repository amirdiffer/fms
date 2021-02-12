import {
  PartMasterState,
  PARTSTORE_PARTMASTER_FEATURE_KEY
} from './part-master/part-master.entity';
import {
  PartListState,
  PARTSTORE_PARTLIST_FEATURE_KEY
} from './part-list/part-list.entity';
import {
  PARTSTORE_ORDERLIST_FEATURE_KEY,
  OrderListState
} from './order-list/order-list.entity';

export const PARTSTORE_FEATURE_KEY = 'part-store';

export interface State {
  readonly [PARTSTORE_PARTLIST_FEATURE_KEY]: PartListState;
  readonly [PARTSTORE_PARTMASTER_FEATURE_KEY]: PartMasterState;
  readonly [PARTSTORE_ORDERLIST_FEATURE_KEY]: OrderListState;
}

export interface PartStorePartialState {
  readonly [PARTSTORE_FEATURE_KEY]: State;
}
