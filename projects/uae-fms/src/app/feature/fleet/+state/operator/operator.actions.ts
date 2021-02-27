import { createAction, props } from '@ngrx/store';
import { IOperatorStateModel } from './operator.entity';


export class OperatorActions {
    static loadAll = createAction('[operator] load all data');
    static allDataLoaded = createAction(
        '[operator] all data are loaded',
        props<{ data: IOperatorStateModel[] }>()
    );
    static error = createAction(
        '[operator] error occurred',
        props<{ reason: any }>()
      );
}