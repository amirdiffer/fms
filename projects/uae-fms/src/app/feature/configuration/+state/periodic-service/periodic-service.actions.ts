import { createAction, props } from '@ngrx/store';
import { IPeriodicService } from '@models/configuration';

export class PeriodicServiceActions {
  static loadAll = createAction('[PeriodicService] load all data');

  static allDataLoaded = createAction(
    '[PeriodicService] all datas are loaded',
    props<{ data: IPeriodicService[] }>()
  );

  static addPeriodicService = createAction(
    '[PeriodicService] add periodic service',
    props<{ data }>()
  );

  static periodicServiceAddedSuccessfully = createAction(
    '[PeriodicService] periodic service added successfully',
    props<{ data }>()
  );

  static error = createAction(
    '[PeriodicService] error occurred',
    props<{ reason: any }>()
  );
}
