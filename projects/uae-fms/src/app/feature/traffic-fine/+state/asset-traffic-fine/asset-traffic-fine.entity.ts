import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IAssetTrafficFine } from '@models/traffic-fine';

export const TRAFFIC_FINES_ASSET_TRAFFIC_FINE_TABLE_FEATURE_KEY =
  'assetTrafficFine';

export interface IAssetTrafficFineState
  extends EntityState<IAssetTrafficFine> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface IAssetTrafficFinePartialState {
  [TRAFFIC_FINES_ASSET_TRAFFIC_FINE_TABLE_FEATURE_KEY]: IAssetTrafficFineState;
}
export const assetTrafficFineAdapter: EntityAdapter<IAssetTrafficFine> = createEntityAdapter<
  IAssetTrafficFine
>();

export const initialState: IAssetTrafficFineState = assetTrafficFineAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as IAssetTrafficFineState
);
