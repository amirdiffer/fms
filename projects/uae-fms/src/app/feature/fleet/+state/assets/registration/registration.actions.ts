import { createAction, props } from '@ngrx/store';
import { IRegistrationModel } from '@feature/fleet/+state/assets/registration/registration.entity';

export class RegistrationActions {
  static loadAll = createAction('[Registration] load all data');

  static allDataLoaded = createAction(
    '[Registration] all datas are loaded',
    props<{ data: IRegistrationModel[] }>()
  );

  static error = createAction(
    '[Registration] error occurred',
    props<{ reason: any }>()
  );
}
