import { IUser } from '@models/configuration';
import { IUserStatistics } from '@models/statistics';
import { createAction, props } from '@ngrx/store';

export class UsersActions {
  static loadAll = createAction('[Users] load all data');

  static allDataLoaded = createAction(
    '[Users] all data are loaded',
    props<{ data: IUser[] }>()
  );

  static addUser = createAction('[Users] add user', props<{ data: IUser }>());

  static userAddedSuccessfully = createAction(
    '[Users] user added successfully',
    props<{ data: IUser }>()
  );

  static editUser = createAction(
    '[User] Eiditing User',
    props<{ user: any }>()
  );

  static userEditedSuccessfully = createAction(
    '[User] User Edited Successfully',
    props<{ user: any }>()
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

  static resetParams = createAction('[Users] Reset Parameters');
}
