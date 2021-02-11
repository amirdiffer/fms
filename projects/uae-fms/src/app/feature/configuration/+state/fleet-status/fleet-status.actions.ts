import { createAction, props } from '@ngrx/store';
import { FleetStatusStateModel } from './fleet-status.entity';

export class FleetStatusActions {
  static loadAll = createAction('[FleetStatus] load all data');

  static allDataLoaded = createAction(
    '[FleetStatus] all datas are loaded',
    props<{ data: FleetStatusStateModel[] }>()
  );

  static error = createAction(
    '[FleetStatus] error occurred',
    props<{ reason: any }>()
  );
}
