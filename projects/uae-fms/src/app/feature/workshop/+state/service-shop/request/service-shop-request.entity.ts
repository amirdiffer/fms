import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IRequest, IRequestListSpecificAsset } from '@models/body-shop';
import { IBodyShopRequestStatistics } from '@models/statistics';

export const WORKSHOP_SERVICESHOP_REQUEST_FEATURE_KEY = 'serviceShopRequest';

export interface ServiceShopRequestState extends EntityState<IRequest> {
  error?: any;
  loaded: boolean;
  statistics?: IBodyShopRequestStatistics;
  message: string;
  requests?: Array<any>
  submitted: boolean;
  assetRequest?:IRequestListSpecificAsset[];
  resultNumber?:number;
}

export interface ServiceshopRequestPartialState {
  [WORKSHOP_SERVICESHOP_REQUEST_FEATURE_KEY]: ServiceShopRequestState;
}

export const serviceShopRequestAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: ServiceShopRequestState = serviceShopRequestAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null,
    statistics: null,
    requests: [],
    submitted: false,
    assetRequest:[],
    resultNumber:0
  } as ServiceShopRequestState
);
