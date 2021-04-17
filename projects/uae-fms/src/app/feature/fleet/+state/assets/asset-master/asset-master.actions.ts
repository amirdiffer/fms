import { createAction, props } from '@ngrx/store';
import { IAssetStatistics } from '@models/statistics';
import { IAssetMaster } from '@models/asset-master.model';

export class AssetMasterActions {
  static loadAll = createAction('[AssetMaster] load all data');

  static allDataLoaded = createAction(
    '[AssetMaster] all datas are loaded',
    props<{ data: IAssetMaster[] }>()
  );
  static count = createAction(
    '[AssetMaster] get result number',
    props<{ data: number }>()
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

  static addAsset = createAction(
    '[AssetMaster] add asset',
    props<{ data: any }>()
  );

  static assetAddedSuccessfully = createAction(
    '[AssetMaster] asset added successfully',
    props<{ data: IAssetMaster }>()
  );

  static editAsset = createAction(
    '[AssetMaster] edit asset',
    props<{ data: any }>()
  );

  static assetEditedSuccessfully = createAction(
    '[AssetMaster] asset added successfully',
    props<{ data: any }>()
  );

  /* Get Asset By Id */
  static assetById= createAction(
    '[AssetMaster] load asset by Id',
    props<{ id: number }>()
  );
  static assetByIdLoaded = createAction(
    '[AssetMaster] specific asset loaded',
    props<{ data: any }>()
  );
  static reset = createAction(
    '[AssetMaster] reset parameters'
  );
}
