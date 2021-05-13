import {
  PartMasterCategoryState,
  PartMasterItemState,
  PARTSTORE_PARTMASTER_CATEGORY_FEATURE_KEY,
  PARTSTORE_PARTMASTER_ITEM_FEATURE_KEY,
} from './part-master/part-master.entity';
import {
  AssetPartListState,
  PARTSTORE_ASSET_PARTLIST_FEATURE_KEY,
  PARTSTORE_SUB_ASSET_PARTLIST_FEATURE_KEY,
  SubAssetPartListState,
} from './part-list/part-list.entity';
import {
  PARTSTORE_REQUEST_LIST_FEATURE_KEY,
  RequestListState
} from '@feature/part-store/+state/order-list/request-list/request-list.entity';
import {
  MyOrderAssetListState,
  PARTSTORE_MY_ORDER_ASSET_LIST_FEATURE_KEY
} from '@feature/part-store/+state/order-list/my-order/asset/my-order-asset.entity';
import {
  MyOrderSubAssetListState,
  PARTSTORE_MY_ORDER_SUB_ASSET_LIST_FEATURE_KEY
} from '@feature/part-store/+state/order-list/my-order/sub-asset/my-order-sub-asset.entity';
import {
  PARTSTORE_SUPPLIERS_LIST_FEATURE_KEY,
  SuppliersListState
} from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';

export const PARTSTORE_FEATURE_KEY = 'part-store';

export interface State {
  readonly [PARTSTORE_ASSET_PARTLIST_FEATURE_KEY]: AssetPartListState;
  readonly [PARTSTORE_SUB_ASSET_PARTLIST_FEATURE_KEY]: SubAssetPartListState;
  readonly [PARTSTORE_REQUEST_LIST_FEATURE_KEY]: RequestListState;
  readonly [PARTSTORE_MY_ORDER_ASSET_LIST_FEATURE_KEY]: MyOrderAssetListState;
  readonly [PARTSTORE_MY_ORDER_SUB_ASSET_LIST_FEATURE_KEY]: MyOrderSubAssetListState;
  readonly [PARTSTORE_SUPPLIERS_LIST_FEATURE_KEY]: SuppliersListState;
  readonly [PARTSTORE_PARTMASTER_CATEGORY_FEATURE_KEY]: PartMasterCategoryState;
  readonly [PARTSTORE_PARTMASTER_ITEM_FEATURE_KEY]: PartMasterItemState;
}

export interface PartStorePartialState {
  readonly [PARTSTORE_FEATURE_KEY]: State;
}
