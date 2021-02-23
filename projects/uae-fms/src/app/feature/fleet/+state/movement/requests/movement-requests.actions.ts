import { createAction, props } from '@ngrx/store';
import { MovementRequestsStateModel } from './movement-requests.entity';

export class MovementRequestsActions {
  static loadAll = createAction('[MovementRequests] load all Requestss');

  static allDataLoaded = createAction(
    '[MovementRequests] all data are loaded',
    props<{ data: MovementRequestsStateModel[] }>()
  );

  static error = createAction(
    '[MovementRequests] error occurred',
    props<{ reason: any }>()
  );
}
