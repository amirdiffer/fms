import { createAction, props } from '@ngrx/store';
import { IRequest } from '@models/body-shop';

export class BodyShopRequestActions {
  static loadAll = createAction('[bodyShopRequest] load all data');

  static allDataLoaded = createAction(
    '[bodyShopRequest] all datas are loaded',
    props<{ data: IRequest[] }>()
  );

  static error = createAction(
    '[bodyShopRequest] error occurred',
    props<{ reason: any }>()
  );
}
