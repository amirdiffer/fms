import { createAction, props } from '@ngrx/store';
import { IBodyshopJobCardStateModel } from './body-shop-job-card.entity';

export class BodyShopJobCardActions {
  static loadAll = createAction('[bodyShopJobCard] load all data');
  static allDataLoaded = createAction(
    '[bodyShopJobCard] all datas are loaded',
    props<{ data: IBodyshopJobCardStateModel[] }>()
  );
  static error = createAction(
    '[bodyShopJobCard] error occurred',
    props<{ reason: any }>()
  );
}
