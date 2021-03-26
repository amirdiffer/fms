import { IFleetStatus } from '@models/fleet-status.model';
import { createAction, props } from '@ngrx/store';

export class FleetStatusSubAssetActions {
  static loadAll = createAction('[FleetStatusSubAsset] load all data');

  static allDataLoaded = createAction(
    '[FleetStatusSubAsset] all datas are loaded',
    props<{ data: IFleetStatus[] }>()
  );

  static error = createAction(
    '[FleetStatus] error occurred',
    props<{ reason: any }>()
  );
}
