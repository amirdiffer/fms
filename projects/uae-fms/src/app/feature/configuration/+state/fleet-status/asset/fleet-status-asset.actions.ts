import { IFleetStatus } from '@models/fleet-status.model';
import { createAction, props } from '@ngrx/store';

export class FleetStatusAssetActions {
  static loadAll = createAction('[FleetStatusAsset] load all data');

  static allDataLoaded = createAction(
    '[FleetStatusAsset] all datas are loaded',
    props<{ data: IFleetStatus[] }>()
  );

  static addFleetStatus = createAction(
    '[FleetStatusAsset] add fleet status',
    props<{ data }>()
  );

  static fleetStatusAddedSuccessfully = createAction(
    '[FleetStatusAsset] fleet status added successfully',
    props<{ data }>()
  );

  static error = createAction(
    '[FleetStatus] error occurred',
    props<{ reason: any }>()
  );
}
