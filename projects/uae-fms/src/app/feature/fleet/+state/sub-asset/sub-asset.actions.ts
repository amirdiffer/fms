import { createAction, props } from '@ngrx/store';
import { ISubasset } from '@models/sub-asset';
import { ISubAssetStatistics } from '@models/statistics';

export class SubAssetActions {
  static loadAll = createAction('[SubAsset] load all data');

  static allDataLoaded = createAction(
    '[SubAsset] all datas are loaded',
    props<{ data: ISubasset[] }>()
  );

  static loadStatistics = createAction('[SubAsset] load all statistics');

  static statisticsLoaded = createAction(
    '[SubAsset] all statistics are loaded',
    props<{ data: ISubAssetStatistics }>()
  );

  static error = createAction(
    '[SubAsset] error occurred',
    props<{ reason: any }>()
  );
}
