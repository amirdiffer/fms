import { createAction, props } from '@ngrx/store';

export class OperatorMovementHistoryActions {
  static loadAll = createAction('[OperatorMovementHistory] load all data', props<{ id: number }>());

  static allDataLoaded = createAction(
    '[OperatorMovementHistory] all data are loaded',
    props<{ data: any[] }>()
  );
  static count = createAction(
    '[OperatorMovementHistory] get result number',
    props<{ data: number }>()
  );

  static error = createAction(
    '[OperatorMovementHistory] error occurred',
    props<{ reason: any }>()
  );

  static resetParams = createAction('[OperatorMovementHistory] Reset Parameters');
}
