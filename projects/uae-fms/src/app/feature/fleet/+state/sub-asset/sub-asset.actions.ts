import { createAction, props } from '@ngrx/store';
import { SubAssetStateModel } from './sub-asset.entity';

export class SubAssetActions {
  static loadAll = createAction('[SubAsset] load all data');

  static allDataLoaded = createAction(
    '[SubAsset] all datas are loaded',
    props<{ data: SubAssetStateModel[] }>()
  );

  static error = createAction(
    '[SubAsset] error occurred',
    props<{ reason: any }>()
  );
}
