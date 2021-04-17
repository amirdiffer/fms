import { createAction, props } from '@ngrx/store';
import {
  SubAssetPolicyState,
} from './sub-asset-policy.entity';
import { IAssetPolicy } from '@models/asset-policy.model';

export class SubAssetPolicyActions {
  static loadAll = createAction('[SubAssetPolicy] load all sub assets');

  static allDataLoaded = createAction(
    '[SubAssetPolicy] all sub assets are loaded',
    props<{ data: IAssetPolicy[] }>()
  );

  static count = createAction(
    '[SubAssetPolicy] get result number',
    props<{ data: number }>()
  );

  static error = createAction(
    '[SubAssetPolicy] error occurred',
    props<{ reason: any }>()
  );
}
