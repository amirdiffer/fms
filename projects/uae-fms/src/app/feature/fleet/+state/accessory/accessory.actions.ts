import { IAccessoryStatistics } from '@models/statistics';
import { createAction, props } from '@ngrx/store';
import { IAccessory } from '@models/accessory';

export class AccessoryActions {

  static loadAll = createAction('[accessory] load all data');
  static allDataLoaded = createAction(
    '[accessory] all data are loaded',
    props<{ data: IAccessory[] }>()
  );
  static error = createAction(
    '[accessory] error occurred',
    props<{ reason: any }>()
  );

  static loadStatistics = createAction('[accessory] load all statistics');

  static statisticsLoaded = createAction(
    '[accessory] all statistics are loaded',
    props<{ data: IAccessoryStatistics }>()
  );

  static addAccessory = createAction(
    '[accessory] add accessory',
    props<{ data: any }>()
  );

  static accessoryAddedSuccessfully = createAction(
    '[accessory] accessory added succesfully',
    props<{ data: IAccessory }>()
  );

  static editAccessory = createAction(
    '[accessory] edit accessory',
    props<{ data: any }>()
  );

  static accessoryEditedSuccessfully = createAction(
    '[accessory] accessory added succesfully',
    props<{ data: IAccessory }>()
  );

  static reset = createAction(
    '[accessory] accessory resets'
  );
}
