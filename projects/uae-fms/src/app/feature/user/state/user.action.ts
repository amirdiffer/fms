import { createAction, props } from '@ngrx/store';

export class UserPorfileAction {
  static loadData = createAction('[userProfile] load user data');
  static dataLoaded = createAction(
    '[userProfile] user data are loaded',
    props<{ data: any }>()
  );
  static error = createAction(
    '[userProfile] error occurred',
    props<{ reason: any }>()
  );
  static resetParams = createAction('[userProfile] reset parameters');
}
