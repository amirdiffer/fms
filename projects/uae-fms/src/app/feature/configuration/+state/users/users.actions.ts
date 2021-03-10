import { IUser } from '@models/configuration';
import { IUserStatistics } from '@models/statistics';
import { createAction, props } from '@ngrx/store';

export class UsersActions {
  static loadAll = createAction('[Users] load all data');

  static allDataLoaded = createAction(
    '[Users] all datas are loaded',
    props<{ data: IUser[] }>()
  );

  static error = createAction(
    '[Users] error occurred',
    props<{ reason: any }>()
  );
  static loadStatistics = createAction('[Users] load all statistics');
  static statisticsLoaded = createAction(
    '[Users] all statistics are loaded',
    props<{ data: IUserStatistics }>()
  );
}
