import { createAction, props } from '@ngrx/store';
import { ITechnician } from '@models/body-shop';

export class BodyShopTechnicianActions {
  static loadAll = createAction('[bodyShopTechnician] load all data');

  static allDataLoaded = createAction(
    '[bodyShopTechnician] all data are loaded',
    props<{ data: ITechnician[] }>()
  );

  static count = createAction(
    '[bodyShopTechnician] get result number',
    props<{ data: number }>()
  );

  static addTechnician = createAction(
    '[Technicians] add technician',
    props<{ data: ITechnician }>()
  );

  static technicianAddedSuccessfully = createAction(
    '[Technicians] technician added successfully',
    props<{ data: ITechnician }>()
  );

  static editTechnician = createAction(
    '[Technician] Editing Technician',
    props<{ technician: any }>()
  );

  static technicianEditedSuccessfully = createAction(
    '[Technician] Technician Edited Successfully',
    props<{ technician: any }>()
  );
  static error = createAction(
    '[bodyShopTechnician] error occurred',
    props<{ reason: any }>()
  );
  static resetParams = createAction('[Technicians] Reset Parameters');
}
