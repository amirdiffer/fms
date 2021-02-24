import { createAction, props } from '@ngrx/store';
import { IMovementRequest } from '@models/movement'
import { IMovementStatistics } from '@models/statistics';
import { IAllMovementRequestState } from './movement-requests.entity';


export class MovementRequestsActions {
  static loadAll = createAction('[MovementRequests] load all Requestss');
  static allDataLoaded = createAction(
    '[MovementRequests] all data are loaded',
    props<{ data: IAllMovementRequestState["movementRequest"][] }>()
  );
  static error = createAction(
    '[MovementRequests] error occurred',
    props<{ reason: any }>()
  );
  static statisticloadAll = createAction('[MovementRequests] load all statistic');
  static allStatisticloaded = createAction(
    '[MovementRequests] all statistic are loaded',
    props<{ data: IAllMovementRequestState["movementStatistic"][] }>()
  );
}
