import { createAction, props } from '@ngrx/store';
import { IOwnerShip } from '@models/configuration';

export class OwnershipActions {
  static loadAll = createAction('[Ownership] load all data');

  static allDataLoaded = createAction(
    '[Ownership] all datas are loaded',
    props<{ data: IOwnerShip[] }>()
  );

  static error = createAction(
    '[Ownership] error occurred',
    props<{ reason: any }>()
  );
}
