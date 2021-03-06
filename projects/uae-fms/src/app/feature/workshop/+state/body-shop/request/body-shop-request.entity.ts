import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IRequest } from '@models/body-shop';

export const WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY = 'bodyShopRequest';

export interface BodyShopRequestState
  extends EntityState<IRequest> {
  error?: any;
  loaded: boolean;
  message: string;
}

export interface BodyshopRequestPartialState {
  [WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY]: BodyShopRequestState;
}

export const bodyShopRequestAdapter: EntityAdapter<IRequest> = createEntityAdapter<
  IRequest
>();

export const initialState: BodyShopRequestState = bodyShopRequestAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null
  } as BodyShopRequestState
);
