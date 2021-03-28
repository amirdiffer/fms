import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY = 'bodyShopRequest';

export interface BodyshopRequestStateModel {
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

export interface BodyShopRequestState
  extends EntityState<BodyshopRequestStateModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export interface BodyshopRequestPartialState {
  [WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY]: BodyShopRequestState;
}

export const bodyShopRequestAdapter: EntityAdapter<BodyshopRequestStateModel> = createEntityAdapter<
  BodyshopRequestStateModel
>();

export const initialState: BodyShopRequestState = bodyShopRequestAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null
  } as BodyShopRequestState
);
