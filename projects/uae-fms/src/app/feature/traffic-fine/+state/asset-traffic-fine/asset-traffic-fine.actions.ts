import { createAction, props } from '@ngrx/store';
import { IAssetTrafficFineStateModel } from './asset-traffic-fine.entity';
import { IAssetTrafficFine } from '@models/traffic-fine';

export class AssetTrafficFineActions {
  static loadAll = createAction('[assetTrafficFine] load all data');
  static allDataLoaded = createAction(
    '[assetTrafficFine] all datas are loaded',
    props<{ data: IAssetTrafficFine[] }>()
  );
  static error = createAction(
    '[assetTrafficFine] error occurred',
    props<{ reason: any }>()
  );
}
