import { createAction, props } from '@ngrx/store';
import { IMyOrderListModel } from '@feature/part-store/+state/order-list/my-order/sub-asset/my-order-sub-asset.entity';
import { IAccessory } from '@models/accessory';

export class MyOrderSubAssetActions {
  static loadAll = createAction('[MyOrderSubAssetList] load all data');

  static allDataLoaded = createAction(
    '[MyOrderSubAssetList] all datas are loaded',
    props<{ data: IMyOrderListModel[] }>()
  );

  static addOrder = createAction(
    '[MyOrderSubAssetList] add order',
    props<{ data: any }>()
  );

  static orderAddedSuccessfully = createAction(
    '[MyOrderSubAssetList] order added successfully',
    props<{ data: IAccessory }>()
  );

  static addRequest = createAction(
    '[MyOrderSubAssetList] add request',
    props<{ data: any }>()
  );

  static requestAddedSuccessfully = createAction(
    '[MyOrderSubAssetList] request added successfully',
    props<{ data: any }>()
  );

  static updateOrder = createAction(
    '[MyOrderSubAssetList] update order',
    props<{ data: any }>()
  );

  static orderUpdatedSuccessfully = createAction(
    '[MyOrderSubAssetList] order updated successfully',
    props<{ data: IAccessory }>()
  );

  static receiveOrder = createAction(
    '[MyOrderSubAssetList] receive order',
    props<{ data: any }>()
  );

  static orderReceivedSuccessfully = createAction(
    '[MyOrderSubAssetList] order received successfully',
    props<{ data: IAccessory }>()
  );

  static error = createAction(
    '[MyOrderSubAssetList] error occurred',
    props<{ reason: any }>()
  );

  static reset = createAction('[MyOrderSubAssetList] my order sub asset resets');
}
