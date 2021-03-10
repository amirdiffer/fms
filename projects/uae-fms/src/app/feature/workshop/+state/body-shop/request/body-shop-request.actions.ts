import { createAction, props } from '@ngrx/store';
import { IRequest } from '@models/body-shop';
import { ResponseBody } from '@models/response-body';
import { IBodyShopRequestStatistics } from '@models/statistics';

export class BodyShopRequestActions {
  static loadAll = createAction('[bodyShopRequest] load all data');
  static loadStatistics = createAction('[bodyShopRequest] load all statistics');
  static allDataLoaded = createAction(
    '[bodyShopRequest] all datas are loaded',
    props<{ data: IRequest[] }>()
  );
  static allStatisticsLoaded = createAction(
    '[bodyShopRequest] all statistics are loaded',
    props<{ data: IBodyShopRequestStatistics }>()
  );

  static error = createAction(
    '[bodyShopRequest] error occurred',
    props<{ reason: any }>()
  );
}
