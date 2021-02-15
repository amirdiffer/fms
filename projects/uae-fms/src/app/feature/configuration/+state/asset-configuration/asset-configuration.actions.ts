import { createAction, props } from '@ngrx/store';
import { AssetConfigurationStateModel } from './asset-configuration.entity';

export class AssetConfigurationActions {
  static loadAll = createAction('[AssetConfiguration] load all data');

  static allDataLoaded = createAction(
    '[AssetConfiguration] all datas are loaded',
    props<{ data: AssetConfigurationStateModel[] }>()
  );

  static error = createAction(
    '[AssetConfiguration] error occurred',
    props<{ reason: any }>()
  );
}
