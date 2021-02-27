import { createAction, props } from '@ngrx/store';
import { AssetTypeStateModel } from './asset-type.entity';

export class AssetTypeActions {
  static loadAll = createAction('[AssetType] load all data');

  static allDataLoaded = createAction(
    '[AssetType] all datas are loaded',
    props<{ data: AssetTypeStateModel[] }>()
  );

  static error = createAction(
    '[AssetType] error occurred',
    props<{ reason: any }>()
  );
}
