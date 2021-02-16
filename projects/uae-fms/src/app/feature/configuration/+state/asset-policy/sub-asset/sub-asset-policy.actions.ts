import { createAction, props } from '@ngrx/store';
import {
  SubAssetPolicyState,
  SubAssetPolicyStateModel
} from './sub-asset-policy.entity';

export class SubAssetPolicyActions {
  static loadAll = createAction('[SubAssetPolicy] load all sub assets');

  static allDataLoaded = createAction(
    '[SubAssetPolicy] all sub assets are loaded',
    props<{ data: SubAssetPolicyStateModel[] }>()
  );

  static error = createAction(
    '[SubAssetPolicy] error occurred',
    props<{ reason: any }>()
  );
}
