import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IRequest } from '@models/body-shop';
import { IBodyShopRequestStatistics } from '@models/statistics';

export const WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY = 'bodyShopRequest';

export interface BodyShopRequestState extends EntityState<IRequest> {
  error?: any;
  loaded: boolean;
  statistics?: IBodyShopRequestStatistics;
  message: string;
  requests?: Array<any>
  submitted: boolean;
}

export interface BodyshopRequestPartialState {
  [WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY]: BodyShopRequestState;
}

export const bodyShopRequestAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialState: BodyShopRequestState = bodyShopRequestAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null,
    statistics: null,
    requests: [],
    submitted: false
  } as BodyShopRequestState
);
