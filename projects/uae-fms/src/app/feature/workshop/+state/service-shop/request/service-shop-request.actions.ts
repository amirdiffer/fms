import { createAction, props } from '@ngrx/store';
import { IRequest, IRequestListSpecificAsset } from '@models/body-shop';
import { IBodyShopRequestStatistics } from '@models/statistics';

export class ServiceShopRequestActions {
  static loadAll = createAction('[serviceShopRequest] load all data');
  static allDataLoaded = createAction(
    '[serviceShopRequest] all data are loaded',
    props<{ data: any[] }>()
    );  
  static count = createAction(
    '[serviceShopRequest] get result number',
    props<{ data: number }>()
  );

  /* Request By ID */
  static loadAllRequestsById = createAction('[serviceShopRequest] load all requests by id',
    props<{ id: number }>()
  );
  
  static requestsByIdDataLoaded = createAction(
    '[serviceShopRequest] requests by id all data are loaded',
    props<{ data: any[] }>()
  );
  

  /* Request By AssetId */
  static loadAllRequestByAssetId = createAction(
    '[serviceShopRequest] load all requests by assetId',
    props<{ assetId: number }>()
  );
  static allRequestByAssetIdLoaded = createAction(
    '[serviceShopRequest] all requests by assetId are loaded',
    props<{ data: IRequestListSpecificAsset[] }>()
  );


  /* Post Request */
  static addRequest = createAction(
    '[serviceShopRequest] add request',
    props<{ data: IRequest }>()
  );
  static requestAddedSuccessfully = createAction(
    '[serviceShopRequest] request added successfully',
    props<{ data: IRequest }>()
  );

  /* Update Request */
  static editRequest = createAction(
    '[serviceShopRequest] edit request',
    props<{ request: any }>()
  );
  static requestEditedSuccessfully = createAction(
    '[serviceShopRequest] request edited successfully',
    props<{ request: any }>()
  );

  /* Statistics */
  static loadStatistics = createAction('[serviceShopRequest] load all statistics');
  static allStatisticsLoaded = createAction(
    '[serviceShopRequest] all statistics are loaded',
    props<{ data: IBodyShopRequestStatistics }>()
  );

  /*Error */
  static error = createAction(
    '[serviceShopRequest] error occurred',
    props<{ reason: any }>()
  );
  /* Reset Params */
  static resetParams = createAction('[serviceShopRequest] reset parameters');
}
