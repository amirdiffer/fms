import { DashboardState } from './dashboard.entity';
import { createAction, props } from '@ngrx/store';

export class DashboardActions {
  static loadAll = createAction('[Dashboard] load all data');

  static allDataLoaded = createAction(
    '[Dashboard] all datas are loaded',
    props<{ data: DashboardState }>()
  );

  static error = createAction(
    '[Dashboard] error occurred',
    props<{ reason: any }>()
  );
}
