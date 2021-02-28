import { createAction, props } from '@ngrx/store';
import { ISubasset } from '@models/sub-asset';

export class SubAssetActions {
  static loadAll = createAction('[SubAsset] load all data');

  static allDataLoaded = createAction(
    '[SubAsset] all datas are loaded',
    props<{ data: ISubasset[] }>()
  );

  static error = createAction(
    '[SubAsset] error occurred',
    props<{ reason: any }>()
  );
}
