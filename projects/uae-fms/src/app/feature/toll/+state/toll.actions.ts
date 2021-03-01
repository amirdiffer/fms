import { createAction, props } from '@ngrx/store';
import { IToll } from '@models/toll';
import { ITollStatistics } from '@models/statistics';

export class TollActions {
  static loadAll = createAction('[Toll] load all data');

  static allDataLoaded = createAction(
    '[Toll] all datas are loaded',
    props<{ data: IToll[] }>()
  );

  static error = createAction(
    '[Toll] error occurred',
    props<{ reason: any }>()
  );
  static loadStatistic = createAction('[Toll] load all statistic');
  static statisticLoaded = createAction(
    '[Toll] all statistic are loaded',
    props<{ data: ITollStatistics }>()
  );

  static loadAssignNow = createAction(
    '[Toll] load assign data',
    props<{ data }>()
  )

  static assignNowLoaded = createAction(
    '[Toll] assign data loaded',
    props<{ data }>()
  )

}
