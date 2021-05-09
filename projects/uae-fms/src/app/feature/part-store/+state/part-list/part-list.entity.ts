import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';
import { IAssetStatistics, IPartListStatistics } from '@models/statistics';

export const PARTSTORE_PARTLIST_FEATURE_KEY = 'part-list';

export interface PartListStateModel {
  thumbImage: string;
  thumbText: string;
  Quantity: string;
  Status: string;
  Total: string;
}

export interface PartListState extends EntityState<PartListStateModel> {
  error?: any;
  loaded: boolean;
  assetStatistics: IPartListStatistics;
  subAssetStatistics: IPartListStatistics;
  message: string;
}

export interface PartListPartialState {
  [PARTSTORE_PARTLIST_FEATURE_KEY]: PartListState;
}

export const partListAdapter: EntityAdapter<PartListStateModel> = createEntityAdapter<
  PartListStateModel
>();

export const initialState: PartListState = partListAdapter.getInitialState({
  loaded: null,
  assetStatistics: null,
  subAssetStatistics: null,
  message: null,
  error: null
} as PartListState);
