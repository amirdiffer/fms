import { createAction, props } from '@ngrx/store';
import { IPeriodicService, ISpecificPeriodicService } from '@models/configuration';

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

  static editPeriodicService = createAction(
    '[PeriodicService] edit periodic service',
    props<{ data }>()
  );

  static periodicServiceAddedSuccessfully = createAction(
    '[PeriodicService] periodic service added successfully',
    props<{ data }>()
  );

  static periodicServiceEditedSuccessfully = createAction(
    '[PeriodicService] periodic service Edited successfully',
    props<{ data }>()
  );

  /* Get Periodic Service  By Id */
  static getPeriodicServiceById = createAction(
      '[PeriodicService] load periodic service by Id',
      props<{ id: number }>()
    );
  static periodicServiceByIdLoaded = createAction(
      '[PeriodicService] specific periodic servicet loaded',
      props<{ data: ISpecificPeriodicService }>()
  );


  static error = createAction(
    '[PeriodicService] error occurred',
    props<{ reason: any }>()
  );

  static reset = createAction('[PeriodicService] reset parameters');
}
