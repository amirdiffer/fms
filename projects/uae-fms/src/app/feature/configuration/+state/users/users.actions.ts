import { IUser } from '@models/configuration';
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
  static error = createAction(
    '[Users] error occurred',
    props<{ reason: any }>()
  );
}
