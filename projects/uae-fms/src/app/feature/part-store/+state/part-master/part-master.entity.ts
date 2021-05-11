import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

export const PARTSTORE_PARTMASTER_CATEGORY_FEATURE_KEY = 'PartMasterCategory';
export const PARTSTORE_PARTMASTER_ITEM_FEATURE_KEY = 'PartMasterItem';

/* CATEGORY */
export interface PartMasterCategoryState extends EntityState<any> {
  error?: any;
  loaded: boolean;
  message: string;
  submitted?: boolean;
  specificCategory?:any;
  listCategoryOfAsset?:any;
  listCategoryOfSubAsset?:any;
}

export const partMasterCategoryAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialStateCategory: PartMasterCategoryState = partMasterCategoryAdapter.getInitialState({
  loaded: false,
  message: null,
  error: null,
  submitted:false,
  specificCategory:null,
  listCategoryOfAsset:null,
  listCategoryOfSubAsset:null,
} as PartMasterCategoryState);


/*  ITEM  */
export interface PartMasterItemState extends EntityState<any> {
  error?: any;
  loaded: boolean;
  message: string;
  submitted?: boolean;
  specificItem?:any;
}

export const partMasterItemAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialStateItem: PartMasterItemState = partMasterItemAdapter.getInitialState({
  loaded: false,
  message: null,
  error: null,
  submitted:false,
  specificItem:null,
} as PartMasterItemState);

export interface PartMasterPartialState {
  [PARTSTORE_PARTMASTER_CATEGORY_FEATURE_KEY]?: PartMasterCategoryState;
  [PARTSTORE_PARTMASTER_ITEM_FEATURE_KEY]?: PartMasterItemState;
}
