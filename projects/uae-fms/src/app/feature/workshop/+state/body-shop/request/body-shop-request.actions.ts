import { createAction, props } from '@ngrx/store';
import { IRequest, IRequestListSpecificAsset } from '@models/body-shop';
import { ResponseBody } from '@models/response-body';
import { IBodyShopRequestStatistics } from '@models/statistics';

export class BodyShopRequestActions {
  static loadAll = createAction('[bodyShopRequest] load all data');
  static allDataLoaded = createAction(
    '[bodyShopRequest] all data are loaded',
    props<{ data: any[] }>()
  );

  static count = createAction(
    '[bodyShopRequest] get result number',
    props<{ data: number }>()
  );

  /* Request By ID */
  static loadAllRequestsById = createAction(
    '[bodyShopRequest] load all requests by id',
    props<{ id: number }>()
  );

  static requestsByIdDataLoaded = createAction(
    '[bodyShopRequest] requests by id all data are loaded',
    props<{ data: any[] }>()
  );

  /* Get Specific Request */
  static getSpecificRequest = createAction(
    '[bodyShopRequest] get specific request',
    props<{ id: number }>()
  );

  static specificRequestLoaded = createAction(
    '[bodyShopRequest] specific request are loaded',
    props<{ data: any }>()
  );

  /* Request By AssetId */
  static loadAllRequestByAssetId = createAction(
    '[bodyShopRequest] load all requests by assetId',
    props<{ assetId: number }>()
  );
  static allRequestByAssetIdLoaded = createAction(
    '[bodyShopRequest] all requests by assetId are loaded',
    props<{ data: IRequestListSpecificAsset[] }>()
  );

  /* Post Request */
  static addRequest = createAction(
    '[bodyShopRequest] add request',
    props<{ data: IRequest }>()
  );
  static requestAddedSuccessfully = createAction(
    '[bodyShopRequest] request added successfully',
    props<{ data: IRequest }>()
  );

  /* Update Request */
  static editRequest = createAction(
    '[bodyShopRequest] edit request',
    props<{ request: any }>()
  );
  static requestEditedSuccessfully = createAction(
    '[bodyShopRequest] request edited successfully',
    props<{ request: any }>()
  );

  /* Statistics */
  static loadStatistics = createAction('[bodyShopRequest] load all statistics');
  static allStatisticsLoaded = createAction(
    '[bodyShopRequest] all statistics are loaded',
    props<{ data: IBodyShopRequestStatistics }>()
  );

  /*Error */
  static error = createAction(
    '[bodyShopRequest] error occurred',
    props<{ reason: any }>()
  );
  /* Reset Params */
  static resetParams = createAction('[bodyShopRequest] reset parameters');
}
