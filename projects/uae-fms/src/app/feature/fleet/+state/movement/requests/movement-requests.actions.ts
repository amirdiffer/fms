import { createAction, props } from '@ngrx/store';
import { IMovementRequest } from '@models/movement'

export class MovementRequestsActions {
  static loadAll = createAction('[MovementRequests] load all Requestss');
  static allDataLoaded = createAction(
    '[MovementRequests] all data are loaded',
    props<{ data: IMovementRequest[] }>()
  );
  static error = createAction(
    '[MovementRequests] error occurred',
    props<{ reason: any }>()
  );
}
