import { createAction, props } from '@ngrx/store';
import { IJobCard } from '@models/body-shop';

export class BodyShopJobCardActions {
  static loadAll = createAction('[bodyShopJobCard] load all data');
  static allDataLoaded = createAction(
    '[bodyShopJobCard] all datas are loaded',
    props<{ data: IJobCard[] }>()
  );
  static addJobCard = createAction(
    '[JobCards] add jobCard',
    props<{ data: IJobCard; assetId: number }>()
  );

  static jobCardAddedSuccessfully = createAction(
    '[JobCards] jobCard added successfully',
    props<{ data: IJobCard }>()
  );

  static editJobCard = createAction(
    '[JobCard] Eiditing JobCard',
    props<{ jobCard: any }>()
  );

  static jobCardEditedSuccessfully = createAction(
    '[JobCard] JobCard Edited Successfully',
    props<{ jobCard: any }>()
  );
  static error = createAction(
    '[bodyShopJobCard] error occurred',
    props<{ reason: any }>()
  );
  static resetParams = createAction('[JobCards] Reset Parameters');
}
