import { createAction, props } from '@ngrx/store';

export class OrderListActions {

  /* '''''Load''''' Order For Asset and Sub Asset */
  static loadOrderPartforAsset = createAction(
    '[orderList] load all asset order data'
  );

  static allOrderListForAssetLoaded = createAction(
    '[orderList] all asset order are loaded',
    props<{ data: any[] }>()
  );

  static loadOrderPartforSubAsset = createAction(
    '[orderList] load all sub asset order part'
  );

  static allOrderListForSubAssetLoaded = createAction(
    '[orderList] all sub asset order part are loaded',
    props<{ data: any[] }>()
  );



  /* '''''Load''''' statistics of Order For Asset and Sub Asset */
  static loadStatisticsOfOrderPartforAsset = createAction(
    '[orderList] load all statistics of order for asset'
  );

  static allStatisticsOfOrderListForAssetLoaded = createAction(
    '[orderList] all statistics of order for asset are loaded',
    props<{ data: any[] }>()
  );

  static loadStatisticsOfOrderPartforSubAsset = createAction(
    '[orderList] load all statistics of order for sub asset'
  );

  static allStatisticsOfOrderListForSubAssetLoaded = createAction(
    '[orderList] all statistics of order for sub asset are loaded',
    props<{ data: any[] }>()
  );

  
  
  /* ''''''Add'''''' Order For Asset and Sub Asset */
  static addOrderPartAsset = createAction(
    '[orderList] add order part of asset',
    props<{ data: any }>()
  );

  static orderOfAssetPartAddedSuccessfully = createAction(
    '[orderList] order part for asset added successfully',
    props<{ data: any }>()
  );

  static addOrderPartSubAsset = createAction(
    '[orderList] add order part of sub asset',
    props<{ data: any }>()
  );

  static orderOfSubAssetPartAddedSuccessfully = createAction(
    '[orderList] order part for sub asset added successfully',
    props<{ data: any }>()
  );
  



  /* '''''Get''''' Specific order for asset and sub asset */
  static getSpecificOrderPartAsset = createAction(
    '[orderList] load specific order part of asset',
    props<{ id: number }>()
  );

  static specificOrderPartOfAssetLoaded = createAction(
      '[orderList] specific order part of asset are loaded',
      props<{ data: any[] }>()
  );

  static getSpecificOrderPartSubAsset = createAction(
    '[orderList] load specific order part of sub asset',
    props<{ id: number }>()
  );

  static specificOrderPartOfSubAssetLoaded = createAction(
    '[orderList] specific order part of sub asset are loaded',
    props<{ data: any[] }>()
  );



  /* '''''Update''''' Order of Asset and Sub Asset*/
  static updateOrderOfAsset = createAction(
    '[orderList] update order part of asset',
    props<{ data: any }>()
  );

  static orderOfAssetUpdatedSuccessfully = createAction(
    '[orderList] order part of asset updated successfully',
    props<{ data: any }>()
  );

  static updateOrderOfSubAsset = createAction(
    '[orderList] update order part of sub asset',
    props<{ data: any }>()
  );

  static orderOfSubAssetUpdatedSuccessfully = createAction(
    '[orderList] order part of sub asset updated successfully',
    props<{ data: any }>()
  );


  /* '''''Receive''''' Specific order for asset and sub asset */
  static receiveSpecificOrderPartAsset = createAction(
    '[orderList] receive specific order part of asset',
    props<{ data: any }>()
  );

  static specificOrderPartOfAssetReceivedSuccessfully = createAction(
      '[orderList] specific order part of asset are received successfully',
      props<{ data: any }>()
  );

  static receiveSpecificOrderPartSubAsset = createAction(
    '[orderList] receive specific order part of sub asset',
    props<{ data: any }>()
  );

  static specificOrderPartOfSubAssetReceivedSuccessfully = createAction(
      '[orderList] specific order part of sub asset are received successfully',
      props<{ data: any }>()
  );



  
  static error = createAction(
    '[orderList] error occurred',
    props<{ reason: any }>()
  );

  static reset = createAction(
    '[orderList] reset parameters'
  );
}
