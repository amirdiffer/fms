import { createAction, props } from '@ngrx/store';
import { PartListStateModel } from './part-list.entity';
import { IPartListStatistics } from '@models/statistics';

export class PartListActions {
  static loadAllAsset = createAction('[PartList] load all asset data');

  static allAssetDataLoaded = createAction(
    '[PartList] all asset datas are loaded',
    props<{ data: PartListStateModel[] }>()
  );

  static loadAllSubAsset = createAction('[PartList] load all sub asset data');

  static allSubAssetDataLoaded = createAction(
    '[PartList] all sub asset datas are loaded',
    props<{ data: PartListStateModel[] }>()
  );

  static loadAssetStatistics = createAction(
    '[PartList] load all asset statistics'
  );

  static assetStatisticsLoaded = createAction(
    '[PartList] all asset statistics are loaded',
    props<{ data: IPartListStatistics }>()
  );

  static loadSubAssetStatistics = createAction(
    '[PartList] load all sub asset statistics'
  );

  static subAssetStatisticsLoaded = createAction(
    '[PartList] all sub asset statistics are loaded',
    props<{ data: IPartListStatistics }>()
  );

  static error = createAction(
    '[PartList] error occurred',
    props<{ reason: any }>()
  );
}
