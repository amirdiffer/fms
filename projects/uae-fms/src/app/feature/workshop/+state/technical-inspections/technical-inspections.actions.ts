import { createAction, props } from '@ngrx/store';
import { ITechnicalInspectionModel } from './technical-inspections.entity';

export class TechnicalInspectionActions {
  static loadAll = createAction('[TechnicalInspection] load all data');

  static allDataLoaded = createAction(
    '[TechnicalInspection] all datas are loaded',
    props<{ data: ITechnicalInspectionModel[] }>()
  );
  static error = createAction(
    '[TechnicalInspection] error occurred',
    props<{ reason: any }>()
  );
}
