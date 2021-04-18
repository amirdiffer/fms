import { createAction, props } from '@ngrx/store';
import { ITechnician } from '@models/body-shop';

export class ServiceShopTechnicianActions {
  static loadAll = createAction('[serviceShopTechnician] load all data');

  static allDataLoaded = createAction(
    '[serviceShopTechnician] all data are loaded',
    props<{ data: ITechnician[] }>()
  );
  static count = createAction(
    '[serviceShopTechnician] get result number',
    props<{ data: number }>()
  );
  static addTechnician = createAction(
    '[serviceShopTechnician] add technician',
    props<{ data: ITechnician }>()
  );

  static technicianAddedSuccessfully = createAction(
    '[serviceShopTechnician] technician added successfully',
    props<{ data: ITechnician }>()
  );

  static editTechnician = createAction(
    '[serviceShopTechnician] Editing Technician',
    props<{ technician: any }>()
  );

  static technicianEditedSuccessfully = createAction(
    '[serviceShopTechnician] Technician Edited Successfully',
    props<{ technician: any }>()
  );
  static error = createAction(
    '[serviceShopTechnician] error occurred',
    props<{ reason: any }>()
  );
  static resetParams = createAction('[serviceShopTechnician] Reset Parameters');
}
