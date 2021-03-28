import { createAction, props } from '@ngrx/store';
import { FleetStatusSubAssetStateModel } from './fleet-status-sub-asset.entity';

export class FleetStatusSubAssetActions {
  static loadAll = createAction('[FleetStatusSubAsset] load all data');

  static allDataLoaded = createAction(
    '[FleetStatusSubAsset] all datas are loaded',
    props<{ data: FleetStatusSubAssetStateModel[] }>()
  );

  static error = createAction(
    '[FleetStatus] error occurred',
    props<{ reason: any }>()
  );
}
