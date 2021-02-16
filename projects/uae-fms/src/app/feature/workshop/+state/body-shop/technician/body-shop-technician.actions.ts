import { createAction, props } from '@ngrx/store';
import { IBodyShopTechnicianStateModel } from './body-shop-technician.entity';


export class BodyShopTechnicianActions {
  static loadAll = createAction('[bodyShopTechnician] load all data');

  static allDataLoaded = createAction(
    '[bodyShopTechnician] all datas are loaded',
    props<{ data: IBodyShopTechnicianStateModel[] }>()
  );

  static error = createAction(
    '[bodyShopTechnician] error occurred',
    props<{ reason: any }>()
  );
}