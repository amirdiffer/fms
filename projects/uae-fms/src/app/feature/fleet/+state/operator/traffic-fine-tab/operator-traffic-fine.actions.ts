import { IOperatorTrafficFine } from '@models/operator';
import { createAction, props } from '@ngrx/store';

export class OperatorTrafficFineActions {
  static loadAll = createAction('[OperatorTrafficFine] load all data', props<{ id: number }>());

  static allDataLoaded = createAction(
    '[OperatorTrafficFine] all data are loaded',
    props<{ data: IOperatorTrafficFine[] }>()
  );
  static count = createAction(
    '[OperatorTrafficFine] get result number',
    props<{ data: number }>()
  );

  static error = createAction(
    '[OperatorTrafficFine] error occurred',
    props<{ reason: any }>()
  );

  static loadStatistics = createAction('[OperatorTrafficFine] load all statistics');

  static statisticsLoaded = createAction(
    '[OperatorTrafficFine] all statistics are loaded',
    props<{ data: any }>()
  );

  static resetParams = createAction('[OperatorTrafficFine] Reset Parameters');
}
