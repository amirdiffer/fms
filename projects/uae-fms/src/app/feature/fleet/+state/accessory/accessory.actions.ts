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

    static statisticsLoaded = createAction(
      '[accessory] all statistics are loaded',
      props<{ data: IAccessoryStatistics }>()
    );
}
