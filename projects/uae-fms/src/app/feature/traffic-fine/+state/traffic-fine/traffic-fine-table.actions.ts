import { createAction, props } from '@ngrx/store';
import { ITrafficFine } from '@models/traffic-fine';
import { ITrafficFineStatistics } from '@models/statistics';

export class TrafficFineTableActions {
  static loadAll = createAction('[TrafficFineTable] load all data');

  static allDataLoaded = createAction(
    '[TrafficFineTable] all datas are loaded',
    props<{ data: ITrafficFine[] }>()
  );

  static loadStatistics = createAction(
    '[TrafficFineTable] load all statistics'
  );

  static statisticsLoaded = createAction(
    '[TrafficFineTable] all statistics are loaded',
    props<{ data: ITrafficFineStatistics }>()
  );

  static error = createAction(
    '[TrafficFineTable] error occurred',
    props<{ reason: any }>()
  );
}
