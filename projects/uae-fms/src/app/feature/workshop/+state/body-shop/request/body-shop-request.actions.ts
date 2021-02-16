import { createAction, props } from '@ngrx/store';
import { BodyshopRequestStateModel } from './body-shop-request.entity';

export class BodyShopRequestActions {
  static loadAll = createAction('[bodyShopRequest] load all data');

  static allDataLoaded = createAction(
    '[bodyShopRequest] all datas are loaded',
    props<{ data: BodyshopRequestStateModel[] }>()
  );

  static error = createAction(
    '[bodyShopRequest] error occurred',
    props<{ reason: any }>()
  );
}
