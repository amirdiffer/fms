import { createAction, props } from '@ngrx/store';
import { IAssetType } from '@models/asset-type.model';

export class AssetTypeActions {
  static loadAll = createAction('[AssetType] load all data');

  static allDataLoaded = createAction(
    '[AssetType] all datas are loaded',
    props<{ data: IAssetType[] }>()
  );

  static addAssetType = createAction(
    '[AssetType] add asset type',
    props<{ data: any }>()
  );

  static assetTypeAddedSuccessfully = createAction(
    '[AssetType] asset type added successfully',
    props<{ data: any }>()
  );

  static addMake = createAction('[AssetType] add make', props<{ data: any }>());

  static makeAddedSuccessfully = createAction(
    '[AssetType] make added successfully',
    props<{ data: any }>()
  );

  static addModel = createAction(
    '[AssetType] add model',
    props<{ data: any }>()
  );

  static modelAddedSuccessfully = createAction(
    '[AssetType] model added successfully',
    props<{ data: any }>()
  );

  static error = createAction(
    '[AssetType] error occurred',
    props<{ reason: any }>()
  );
}
