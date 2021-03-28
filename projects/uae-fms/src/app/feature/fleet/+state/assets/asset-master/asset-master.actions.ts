import { createAction, props } from '@ngrx/store';
import { IAssetMasterModel } from '@feature/fleet/+state/assets/asset-master/asset-master.entity';

export class AssetMasterActions {
  static loadAll = createAction('[AssetMaster] load all data');

  static allDataLoaded = createAction(
    '[AssetMaster] all datas are loaded',
    props<{ data: IAssetMasterModel[] }>()
  );

  static error = createAction(
    '[AssetMaster] error occurred',
    props<{ reason: any }>()
  );
}
