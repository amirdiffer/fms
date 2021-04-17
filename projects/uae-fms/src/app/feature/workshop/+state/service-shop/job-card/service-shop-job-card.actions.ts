import { createAction, props } from '@ngrx/store';
import { IJobCard } from '@models/body-shop';

export class ServiceShopJobCardActions {
  static loadAll = createAction('[serviceShopJobCard] load all data');
  static allDataLoaded = createAction(
    '[serviceShopJobCard] all datas are loaded',
    props<{ data: IJobCard[] }>()
  );
  static count = createAction(
    '[serviceShopJobCard] get result number',
    props<{ data: number }>()
  );
  static addJobCard = createAction(
    '[serviceShopJobCard] add jobCard',
    props<{ data: IJobCard; assetId: number }>()
  );

  static jobCardAddedSuccessfully = createAction(
    '[serviceShopJobCard] jobCard added successfully',
    props<{ data: IJobCard }>()
  );

  static editJobCard = createAction(
    '[serviceShopJobCard] Eiditing JobCard',
    props<{ jobCard: any }>()
  );

  static jobCardEditedSuccessfully = createAction(
    '[serviceShopJobCard] JobCard Edited Successfully',
    props<{ jobCard: any }>()
  );
  static error = createAction(
    '[serviceShopJobCard] error occurred',
    props<{ reason: any }>()
  );
  static resetParams = createAction('[serviceShopJobCard] Reset Parameters');
}
