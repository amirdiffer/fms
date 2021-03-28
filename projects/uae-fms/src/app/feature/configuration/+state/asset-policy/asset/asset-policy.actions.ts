import { createAction, props } from '@ngrx/store';
import { AssetPolicyStateModel } from './asset-policy.entity';

export class AssetPolicyActions {
  static loadAll = createAction('[AssetPolicy] load all assets');

  static allDataLoaded = createAction(
    '[AssetPolicy] all datas are loaded',
    props<{ data: AssetPolicyStateModel[] }>()
  );

  static error = createAction(
    '[AssetPolicy] error occurred',
    props<{ reason: any }>()
  );
}
