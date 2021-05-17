import { createAction, props } from '@ngrx/store';
import { IMyOrderListModel } from '@feature/part-store/+state/order-list/my-order/asset/my-order-asset.entity';

export class MyOrderAssetActions {
  static loadAll = createAction('[MyOrderAssetList] load all data');

  static allDataLoaded = createAction(
    '[MyOrderAssetList] all datas are loaded',
    props<{ data: IMyOrderListModel[] }>()
  );

  static addOrder = createAction(
    '[MyOrderAssetList] add order',
    props<{ data: any }>()
  );

  static orderAddedSuccessfully = createAction(
    '[MyOrderAssetList] order added successfully',
    props<{ data: any }>()
  );

  static addRequest = createAction(
    '[MyOrderAssetList] add request',
    props<{ data: any }>()
  );

  static requestAddedSuccessfully = createAction(
    '[MyOrderAssetList] request added successfully',
    props<{ data: any }>()
  );

  static updateOrder = createAction(
    '[MyOrderAssetList] update order',
    props<{ data: any }>()
  );

  static orderUpdatedSuccessfully = createAction(
    '[MyOrderAssetList] order updated successfully',
    props<{ data: any }>()
  );

  static receiveOrder = createAction(
    '[MyOrderAssetList] receive order',
    props<{ data: any }>()
  );

  static orderReceivedSuccessfully = createAction(
    '[MyOrderAssetList] order received successfully',
    props<{ data: any }>()
  );

  static error = createAction(
    '[MyOrderAssetList] error occurred',
    props<{ reason: any }>()
  );

  static reset = createAction('[MyOrderAssetList] my order asset resets');
}
