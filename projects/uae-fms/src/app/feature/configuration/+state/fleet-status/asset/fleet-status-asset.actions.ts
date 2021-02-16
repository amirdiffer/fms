import { createAction, props } from '@ngrx/store';
import { FleetStatusAssetStateModel } from './fleet-status-asset.entity';

export class FleetStatusAssetActions {
  static loadAll = createAction('[FleetStatusAsset] load all data');

  static allDataLoaded = createAction(
    '[FleetStatusAsset] all datas are loaded',
    props<{ data: FleetStatusAssetStateModel[] }>()
  );

  static error = createAction(
    '[FleetStatus] error occurred',
    props<{ reason: any }>()
  );
}
