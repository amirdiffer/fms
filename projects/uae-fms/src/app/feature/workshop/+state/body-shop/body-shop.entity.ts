import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

export const WORKSHOP_BODYSHOP_FEATURE_KEY = 'bodyShop';

export interface BodyshopStateModel {
  item: {
    title: string;
    dpd: string;
    thumb: string;
    flag: boolean;
  };
  issue: string;
  source: string;
  refrenceNo: string;
  jobType: string;
  date: string;
  accident: string;
  action: string;
}

export interface BodyShopState extends EntityState<BodyshopStateModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export interface BodyshopPartialState {
  [WORKSHOP_BODYSHOP_FEATURE_KEY]: BodyShopState;
}

export const bodyShopAdapter: EntityAdapter<BodyshopStateModel> = createEntityAdapter<
  BodyshopStateModel
>();

export const initialState: BodyShopState = bodyShopAdapter.getInitialState({
  loaded: null,
  message: null,
  error: null
} as BodyShopState);
