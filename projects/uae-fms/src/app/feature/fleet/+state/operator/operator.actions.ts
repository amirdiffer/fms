import { IOperator } from '@models/operator';
import { IOperatorStatistics } from '@models/statistics';
import { createAction, props } from '@ngrx/store';

export class OperatorActions {
  static loadAll = createAction('[operator] load all data');
  static allDataLoaded = createAction(
    '[operator] all data are loaded',
    props<{ data: IOperator[] }>()
  );
  static count = createAction(
    '[operator] get result number',
    props<{ data: number }>()
  );
  static addOperator = createAction(
    '[Operators] add operator',
    props<{ data: IOperator }>()
  );

  static operatorAddedSuccessfully = createAction(
    '[Operators] operator added successfully',
    props<{ data: IOperator }>()
  );

  static editOperator = createAction(
    '[Operator] Editing Operator',
    props<{ operator: any }>()
  );

  static operatorEditedSuccessfully = createAction(
    '[Operator] Operator Edited Successfully',
    props<{ operator: any }>()
  );
  static error = createAction(
    '[operator] error occurred',
    props<{ reason: any }>()
  );

  static loadStatistics = createAction('[Operators] load all statistics');

  static statisticsLoaded = createAction(
    '[Operators] all statistics are loaded',
    props<{ data: any }>()
  );

  static resetParams = createAction('[Operators] Reset Parameters');
}
