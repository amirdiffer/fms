import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

export const PARTSTORE_PARTMASTER_FEATURE_KEY = 'part-master';

export interface PartMasterStateModel {
  img: string;
  itemName: string;
  model: string;
  quantity: number;
  status: string;
  statusColor: string;
}

export interface PartMasterState extends EntityState<PartMasterStateModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export interface PartMasterPartialState {
  [PARTSTORE_PARTMASTER_FEATURE_KEY]: PartMasterState;
}

export const partMasterAdapter: EntityAdapter<PartMasterStateModel> = createEntityAdapter<
  PartMasterStateModel
>();

export const initialState: PartMasterState = partMasterAdapter.getInitialState({
  loaded: null,
  message: null,
  error: null
} as PartMasterState);
