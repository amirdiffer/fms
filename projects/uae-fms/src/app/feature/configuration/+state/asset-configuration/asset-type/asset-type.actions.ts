import { createAction, props } from '@ngrx/store';
import { IAssetType } from '@models/asset-type.model';

export class AssetTypeActions {
  static loadAll = createAction('[AssetType] load all data');

  static allDataLoaded = createAction(
    '[AssetType] all datas are loaded',
    props<{ data: IAssetType[] }>()
  );

  static error = createAction(
    '[AssetType] error occurred',
    props<{ reason: any }>()
  );
}
