import { createAction, props } from '@ngrx/store';
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
