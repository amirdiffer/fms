import { createAction, props } from '@ngrx/store';
import {
  SubAssetPolicyState,
  SubAssetPolicyStateModel
} from './sub-asset-policy.entity';

export class SubAssetPolicyActions {
  static loadAll = createAction('[AssetPolicy] load all sub assets');

  static allDataLoaded = createAction(
    '[AssetPolicy all sub assets are loaded]',
    props<{ data: SubAssetPolicyStateModel[] }>()
  );

  static error = createAction(
    '[AssetPolicy] error occurred',
    props<{ reason: any }>()
  );
}
