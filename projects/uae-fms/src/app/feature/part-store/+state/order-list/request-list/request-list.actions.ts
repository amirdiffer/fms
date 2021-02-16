import { RequestListStateModel } from './request-list.entity';
import { createAction, props } from '@ngrx/store';

export class RequestListActions {
  static loadAll = createAction('[RequestList] load all data');

  static allDataLoaded = createAction(
    '[RequestList] all datas are loaded',
    props<{ data: RequestListStateModel[] }>()
  );

  static error = createAction(
    '[RequestList] error occurred',
    props<{ reason: any }>()
  );
}
