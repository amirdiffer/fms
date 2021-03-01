import { createAction, props } from '@ngrx/store';
import { IPeriodicService } from '@models/configuration';

export class PeriodicServiceActions {
  static loadAll = createAction('[PeriodicService] load all data');

  static allDataLoaded = createAction(
    '[PeriodicService] all datas are loaded',
    props<{ data: IPeriodicService[] }>()
  );

  static error = createAction(
    '[PeriodicService] error occurred',
    props<{ reason: any }>()
  );
}
