import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FLEET_SUB_ASSET_FEATURE_KEY = 'sub-asset';

export interface SubAssetStateModel {
  subAssetNameItem: {
    name: string;
    thumb: string;
  };
  date: string;
  make: string;
  model: string;
  policy: string;
  serialNumber: string;
  type: string;
  warrantyExpireDate: string;
}

export interface SubAssetState extends EntityState<SubAssetStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface SubAssetPartialState {
  [FLEET_SUB_ASSET_FEATURE_KEY]: SubAssetState;
}

export const subAssetAdapter: EntityAdapter<SubAssetStateModel> = createEntityAdapter<
  SubAssetStateModel
>();

export const initialState: SubAssetState = subAssetAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null
} as SubAssetState);
