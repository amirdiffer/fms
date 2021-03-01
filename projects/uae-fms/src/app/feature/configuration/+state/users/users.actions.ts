import { IUser } from '@models/configuration';
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
}
