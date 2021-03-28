import { createAction, props } from '@ngrx/store';
import { IntegrationStateModel } from './integration.entity';

export class IntegrationActions {
  static loadAll = createAction('[Integration] load all data');

  static allDataLoaded = createAction(
    '[Integration] all datas are loaded',
    props<{ data: IntegrationStateModel[] }>()
  );

  static error = createAction(
    '[Integration] error occurred',
    props<{ reason: any }>()
  );
}
