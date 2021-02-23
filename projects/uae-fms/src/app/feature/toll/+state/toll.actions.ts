import { createAction, props } from '@ngrx/store';
import { IToll } from '@models/toll';

export class TollActions {
  static loadAll = createAction('[Toll] load all data');

  static allDataLoaded = createAction(
    '[Toll] all datas are loaded',
    props<{ data: IToll[] }>()
  );

  static error = createAction(
    '[Toll] error occurred',
    props<{ reason: any }>()
  );
}
