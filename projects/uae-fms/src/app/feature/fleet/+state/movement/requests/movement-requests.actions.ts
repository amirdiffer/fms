import { createAction, props } from '@ngrx/store';
import { IMovementRequest } from '@models/movement'
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

  static loadStatistic = createAction('[MovementRequests] load all StatisticRequest');

  static statisticRequestLoaded = createAction(
    '[MovementRequests] all StatisticRequest data are loaded',
    props<{ data: IMovementStatistics }>()
  );

  static addMovementRequest = createAction(
    '[MovementRequests] add Movement Request',
    props<{ data: any }>()
  );

  static movementRequestAddedSuccessfully = createAction(
    '[MovementRequests] Movement Request added successfully',
    props<{ data: any }>()
  );

  static editMovementRequest = createAction(
    '[MovementRequests] edit Movement Request',
    props<{ data: any }>()
  );

  static movementRequestEditedSuccessfully = createAction(
    '[MovementRequests] Movement Request added successfully',
    props<{ data: any }>()
  );

  static reject = createAction(
    '[MovementRequests] reject Request',
    props<{ data: any }>()
  );
  static rejectSuccessfully = createAction(
    '[MovementRequests] rejectSuccessfully Request',
    props<{ data: any }>()
  );


  static assign = createAction(
    '[MovementRequests] assign Request',
    props<{ id: any, data: any }>()
  );

  static assignSuccessfully = createAction(
    '[MovementRequests] assignSuccessfully Request',
    props<{ data: any }>()
  );

  static reset = createAction(
    '[MovementRequests] reset params'
  );


}
