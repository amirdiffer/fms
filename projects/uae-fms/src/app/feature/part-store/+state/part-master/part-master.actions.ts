import { createAction, props } from '@ngrx/store';
import { PartMasterStateModel } from './part-master.entity';

export class PartMasterActions {
  static loadAll = createAction('[PartMaster] load all data');

  static allDataLoaded = createAction(
    '[PartMaster] all datas are loaded',
    props<{ data: PartMasterStateModel[] }>()
  );

  static error = createAction(
    '[PartMaster] error occurred',
    props<{ reason: any }>()
  );
}
