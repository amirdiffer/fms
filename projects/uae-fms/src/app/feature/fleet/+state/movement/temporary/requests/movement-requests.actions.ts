import { createAction, props } from '@ngrx/store';
import { IMovementRequest } from '@models/movement'
import { IMovementStatistics } from '@models/statistics';

export class MovementRequestsActionsTemporary {
  static loadAll = createAction('[MovementRequestsTemporary] load all Requests');

  static allDataLoaded = createAction(
    '[MovementRequestsTemporary] all data are loaded',
    props<{ data: IMovementRequest[] }>()
  );
  static error = createAction(
    '[MovementRequestsTemporary] error occurred',
    props<{ reason: any }>()
  );

  static loadStatistic = createAction('[MovementRequestsTemporary] load all StatisticRequest');

  static statisticRequestLoaded = createAction(
    '[MovementRequestsTemporary] all StatisticRequest data are loaded',
    props<{ data: IMovementStatistics }>()
  );

  static addMovementRequest = createAction(
    '[MovementRequestsTemporary] add Movement Request',
    props<{ data: any }>()
  );

  static movementRequestAddedSuccessfully = createAction(
    '[MovementRequestsTemporary] Movement Request added successfully',
    props<{ data: any }>()
  );

  static editMovementRequest = createAction(
    '[MovementRequestsTemporary] edit Movement Request',
    props<{ data: any }>()
  );

  static movementRequestEditedSuccessfully = createAction(
    '[MovementRequests] Movement Request added successfully',
    props<{ data: any }>()
  );

  static reject = createAction(
    '[MovementRequestsTemporary] reject Request',
    props<{ data: any }>()
  );
  static rejectSuccessfully = createAction(
    '[MovementRequestsTemporary] rejectSuccessfully Request',
    props<{ data: any }>()
  );


  static assign = createAction(
    '[MovementRequestsTemporary] assign Request',
    props<{ id: any, data: any }>()
  );

  static assignSuccessfully = createAction(
    '[MovementRequestsTemporary] assignSuccessfully Request',
    props<{ data: any }>()
  );

  static reset = createAction(
    '[MovementRequestsTemporary] reset params'
  );


}
