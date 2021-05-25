import { createAction, props } from '@ngrx/store';
import { IAssetPolicy } from '@models/asset-policy.model';

export class AssetPolicyActions {
  static loadAll = createAction('[AssetPolicy] load all assets');

  static allDataLoaded = createAction(
    '[AssetPolicy] all datas are loaded',
    props<{ data: IAssetPolicy[] }>()
  );

  static count = createAction(
    '[AssetPolicy] get result number',
    props<{ data: number }>()
  );
  static error = createAction(
    '[AssetPolicy] error occurred',
    props<{ reason: any }>()
  );
  static addAssetPolicy = createAction(
    '[AssetPolicy] added asset policy',
    props<{ data: IAssetPolicy }>()
  );

  static editAssetPolicy = createAction(
    '[AssetPolicy] updated asset policy',
    props<{ data: IAssetPolicy }>()
  );

  static addAssetPolicySuccessfully = createAction(
    '[AssetPolicy] asset policy added successfully',
    props<{ data: IAssetPolicy }>()
  );

  static editAssetPolicySuccessfully = createAction(
    '[AssetPolicy] asset policy updated successfully',
    props<{ data: IAssetPolicy }>()
  );

  static getSpecificAssetPolicy = createAction(
    '[AssetPolicy] get specific asset policy',
    props<{ id:number }>()
  );

  static specificAssetPolicyLoaded = createAction(
    '[AssetPolicy]  specific asset policy are loaded',
    props<{ data:any }>()
  );

  static reset = createAction('[AssetPolicy] reset parameters');
}
