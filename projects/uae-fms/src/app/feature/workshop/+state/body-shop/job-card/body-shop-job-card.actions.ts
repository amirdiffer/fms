import { createAction, props } from '@ngrx/store';
import { IJobCard } from '@models/body-shop';

export class BodyShopJobCardActions {
  static loadAll = createAction('[bodyShopJobCard] load all data');
  static allDataLoaded = createAction(
    '[bodyShopJobCard] all datas are loaded',
    props<{ data: IJobCard[] }>()
  );
  static error = createAction(
    '[bodyShopJobCard] error occurred',
    props<{ reason: any }>()
  );
}
