import { createAction, props } from '@ngrx/store';
import { OwnershipStateModel } from './ownership.entity';

export class OwnershipActions {
  static loadAll = createAction('[Ownership] load all data');

  static allDataLoaded = createAction(
    '[Ownership] all datas are loaded',
    props<{ data: OwnershipStateModel[] }>()
  );

  static error = createAction(
    '[Ownership] error occurred',
    props<{ reason: any }>()
  );
}
