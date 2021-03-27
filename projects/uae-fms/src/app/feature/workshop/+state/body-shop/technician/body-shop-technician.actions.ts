import { createAction, props } from '@ngrx/store';
import { ITechnician } from '@models/body-shop';

export class BodyShopTechnicianActions {
  static loadAll = createAction('[bodyShopTechnician] load all data');

  static allDataLoaded = createAction(
    '[bodyShopTechnician] all datas are loaded',
    props<{ data: ITechnician[] }>()
  );

  static error = createAction(
    '[bodyShopTechnician] error occurred',
    props<{ reason: any }>()
  );
}
