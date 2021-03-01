import { createAction, props } from '@ngrx/store';
import { IIntegration } from '@models/integration';
import { ResponseBody } from '@models/response-body';

export class IntegrationActions {
  static loadAll = createAction('[Integration] load all data');

  static allDataLoaded = createAction(
    '[Integration] all datas are loaded',
    props<{ data: IIntegration[] }>()
  );

  static error = createAction(
    '[Integration] error occurred',
    props<{ reason: any }>()
  );
}
