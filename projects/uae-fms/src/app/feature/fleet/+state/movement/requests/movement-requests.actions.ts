import { createAction, props } from '@ngrx/store';
import { IMovementRequest } from '@models/movement';
import { IMovementStatistics } from '@models/statistics';

export class MovementRequestsActions {
  static loadAll = createAction('[MovementRequests] load all Requests');

  static allDataLoaded = createAction(
    '[MovementRequests] all data are loaded',
    props<{ data: IMovementRequest[] }>()
  );
  static error = createAction(
    '[MovementRequests] error occurred',
    props<{ reason: any }>()
  );

  static loadStatistic = createAction(
    '[MovementRequests] load all StatisticRequest'
  );

  static statisticRequestLoaded = createAction(
    '[MovementRequests] all StatisticRequest data are loaded',
    props<{ data: IMovementStatistics }>()
  );
}
