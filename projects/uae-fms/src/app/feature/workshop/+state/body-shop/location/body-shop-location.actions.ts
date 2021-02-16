import { createAction, props } from '@ngrx/store';
import { IBodyShopLocationStateModel } from './body-shop-location.entity';


export class BodyShopLocationActions {
  static loadAll = createAction('[bodyShopLocation] load all data');

  static allDataLoaded = createAction(
    '[bodyShopLocation] all datas are loaded',
    props<{ data: IBodyShopLocationStateModel[] }>()
  );

  static error = createAction(
    '[bodyShopLocation] error occurred',
    props<{ reason: any }>()
  );
}
