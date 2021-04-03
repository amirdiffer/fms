import { createAction, props } from '@ngrx/store';
import { IRequest } from '@models/body-shop';
import { ResponseBody } from '@models/response-body';
import { IBodyShopRequestStatistics } from '@models/statistics';

export class BodyShopRequestActions {
  static loadAll = createAction('[bodyShopRequest] load all data');
  static loadStatistics = createAction('[bodyShopRequest] load all statistics');
  static allDataLoaded = createAction(
    '[bodyShopRequest] all data are loaded',
    props<{ data: any[] }>()
  );

  static loadAllRequestsById = createAction('[bodyShopRequest] load all requests by id',
    props<{ id: number }>()
    );
  static requestsByIdDataLoaded = createAction(
    '[bodyShopRequest] requests by id all data are loaded',
    props<{ data: any[] }>()
  );

  static addRequest = createAction(
    '[bodyShopRequest] add request',
    props<{ data: IRequest }>()
  );
  static requestAddedSuccessfully = createAction(
    '[bodyShopRequest] request added successfully',
    props<{ data: IRequest }>()
  );
  static editRequest = createAction(
    '[bodyShopRequest] edit request',
    props<{ request: any }>()
  );
  static requestEditedSuccessfully = createAction(
    '[bodyShopRequest] request edited successfully',
    props<{ request: any }>()
  );

  static allStatisticsLoaded = createAction(
    '[bodyShopRequest] all statistics are loaded',
    props<{ data: IBodyShopRequestStatistics }>()
  );

  static error = createAction(
    '[bodyShopRequest] error occurred',
    props<{ reason: any }>()
  );

  static resetParams = createAction('[bodyShopRequest] reset parameters');
}
