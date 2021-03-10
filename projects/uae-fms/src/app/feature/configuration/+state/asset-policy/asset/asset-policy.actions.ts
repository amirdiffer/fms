import { createAction, props } from '@ngrx/store';
import { IAssetPolicy } from '@models/asset-policy.model';

export class AssetPolicyActions {
  static loadAll = createAction('[AssetPolicy] load all assets');

  static allDataLoaded = createAction(
    '[AssetPolicy] all datas are loaded',
    props<{ data: IAssetPolicy[] }>()
  );

  static error = createAction(
    '[AssetPolicy] error occurred',
    props<{ reason: any }>()
  );
  static addAssetPolicy = createAction(
    '[AssetPolicy] add asset policy',
    props<{ data: IAssetPolicy }>()
  );
  static addAssetPolicySuccessfully = createAction(
    '[AssetPolicy] asset policy added successfully',
    props<{ data: IAssetPolicy }>()
  );
}
