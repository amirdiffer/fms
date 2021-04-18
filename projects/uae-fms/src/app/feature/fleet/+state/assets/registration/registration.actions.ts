import { createAction, props } from '@ngrx/store';
import { IPendingRegistration } from '@models/pending-registration.model';

export class RegistrationActions {
  static loadAll = createAction('[Registration] load all data');

  static allDataLoaded = createAction(
    '[Registration] all datas are loaded',
    props<{ data: IPendingRegistration[] }>()
  );
  static count = createAction(
    '[Registration] get result number',
    props<{ data: number }>()
  );
  static registerAsset = createAction(
    '[Registration] register an asset',
    props<{ data: any }>()
  );
  static assetRegisterSuccessfull = createAction(
    '[Registration] asset registered successfully ',
    props<{ data: any }>()
  );
  static error = createAction(
    '[Registration] error occurred',
    props<{ reason: any }>()
  );
}
