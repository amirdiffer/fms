import { createAction, props } from '@ngrx/store';
import { PeriodicServiceStateModel } from './periodic-service.entity';

export class PeriodicServiceActions {
  static loadAll = createAction('[PeriodicService] load all data');

  static allDataLoaded = createAction(
    '[PeriodicService] all datas are loaded',
    props<{ data: PeriodicServiceStateModel[] }>()
  );

  static error = createAction(
    '[PeriodicService] error occurred',
    props<{ reason: any }>()
  );
}
