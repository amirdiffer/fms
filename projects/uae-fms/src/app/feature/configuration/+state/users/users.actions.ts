import { createAction, props } from '@ngrx/store';
import { UsersStateModel } from './users.entity';

export class UsersActions {
  static loadAll = createAction('[Users] load all data');

  static allDataLoaded = createAction(
    '[Users] all datas are loaded',
    props<{ data: UsersStateModel[] }>()
  );

  static error = createAction(
    '[Users] error occurred',
    props<{ reason: any }>()
  );
}
