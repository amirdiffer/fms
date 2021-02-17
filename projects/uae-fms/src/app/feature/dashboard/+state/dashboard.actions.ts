import { createAction, props } from '@ngrx/store';
import { Dashboard } from "@models/dashboard";
export class DashboardActions {
  static loadAll = createAction('[Dashboard] load all data');

  static allDataLoaded = createAction(
    '[Dashboard] all datas are loaded',
    props<{ data: Dashboard }>()
  );

  static error = createAction(
    '[Dashboard] error occurred',
    props<{ reason: any }>()
  );
}
