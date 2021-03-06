import { createAction, props } from '@ngrx/store';
import { IPendingRegistration } from '@models/pending-registration.model';

export class RegistrationActions {
  static loadAll = createAction('[Registration] load all data');

  static allDataLoaded = createAction(
    '[Registration] all datas are loaded',
    props<{ data: IPendingRegistration[] }>()
  );

  static error = createAction(
    '[Registration] error occurred',
    props<{ reason: any }>()
  );
}
