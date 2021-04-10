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

  static addOwnership = createAction(
    '[Ownership] add ownership',
    props<{ data: any }>()
  );

  static ownershipAddedSuccessfully = createAction(
    '[Ownership] ownership added succesfully',
    props<{ data: IOwnerShip }>()
  );

  static editOwnership = createAction(
    '[Ownership] edit ownership',
    props<{ data: any }>()
  );

  static ownershipEditedSuccessfully = createAction(
    '[Ownership] ownership added succesfully',
    props<{ data: IOwnerShip }>()
  );

  static resetParams = createAction('[Ownership] Reset Parameters');
}
