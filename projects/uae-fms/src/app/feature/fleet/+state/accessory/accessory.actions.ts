import { IAccessoryStatistics } from '@models/statistics';
import { createAction, props } from '@ngrx/store';
import { IAccessoryStateModel } from './accessory.entity';

export class AccessoryActions {
  static loadAll = createAction('[accessory] load all data');
  static allDataLoaded = createAction(
    '[accessory] all data are loaded',
    props<{ data: IAccessoryStateModel[] }>()
  );

  static loadStatistics = createAction('[accessory] load all statistics');

  static statisticsLoaded = createAction(
    '[accessory] all statistics are loaded',
    props<{ data: IAccessoryStatistics }>()
  );

  static error = createAction(
    '[accessory] error occurred',
    props<{ reason: any }>()
  );
}
