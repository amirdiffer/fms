import { createAction, props } from '@ngrx/store';
import { IAssetMasterModel } from '@feature/fleet/+state/assets/asset-master/asset-master.entity';
import { IAssetStatistics } from '@models/statistics';

export class AssetMasterActions {
  static loadAll = createAction('[AssetMaster] load all data');

  static allDataLoaded = createAction(
    '[AssetMaster] all datas are loaded',
    props<{ data: IAssetMasterModel[] }>()
  );

  static loadStatistics = createAction('[AssetMaster] load all statistics');

  static statisticsLoaded = createAction(
    '[AssetMaster] all statistics are loaded',
    props<{ data: IAssetStatistics }>()
  );

  static error = createAction(
    '[AssetMaster] error occurred',
    props<{ reason: any }>()
  );
}
