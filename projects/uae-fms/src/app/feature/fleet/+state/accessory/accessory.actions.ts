import { createAction, props } from '@ngrx/store';
import { IAccessoryStateModel } from './accessory.entity';

export class AccessoryActions {
  static loadAll = createAction('[accessory] load all data');
  static allDataLoaded = createAction(
    '[accessory] all data are loaded',
    props<{ data: IAccessoryStateModel[] }>()
  );
  static error = createAction(
    '[accessory] error occurred',
    props<{ reason: any }>()
  );
}
