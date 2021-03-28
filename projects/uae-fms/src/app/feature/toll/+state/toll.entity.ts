import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const TOLL_FEATURE_KEY = 'toll';

export interface TollStateModel {
  tollTag: string;
  status: string;
  assetsItem: {
    assetName: string;
    subAsset: string;
  };
  purchaseDate: string;
}

export interface TollState extends EntityState<TollStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
  assignNow?: object;
}

export interface TollPartialState {
  [TOLL_FEATURE_KEY]: TollState;
}

export const tollAdapter: EntityAdapter<TollStateModel> = createEntityAdapter<
  TollStateModel
>();

export const initialState: TollState = tollAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null,
  assignNow: null,
} as TollState);
