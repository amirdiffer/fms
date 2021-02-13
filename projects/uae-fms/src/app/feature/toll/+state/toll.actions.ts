import { createAction, props } from '@ngrx/store';
import { TollStateModel } from './toll.entity';

export class TollActions {
  static loadAll = createAction('[Toll] load all data');

  static allDataLoaded = createAction(
    '[Toll] all datas are loaded',
    props<{ data: TollStateModel[] }>()
  );

  static error = createAction(
    '[Toll] error occurred',
    props<{ reason: any }>()
  );
}
