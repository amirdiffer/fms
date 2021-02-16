import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export const WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY = 'bodyShopLocation';
export interface IBodyShopLocationStateModel{
    locationID:string;
    service:string;
    address:string;
    section:number;
    jobCard:number;
    technician:number;
    assetCapacity:{
        asset:string;
        capacity:string;
    }
}

export interface IBodyShopLocationState extends EntityState<IBodyShopLocationStateModel> {
    error?: any;
    loaded: boolean;
    message: string;
}
export interface IBodyShopLocationPartialState {
    [WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY]: IBodyShopLocationState;
}
export const bodyShopLocationAdapter: EntityAdapter<IBodyShopLocationStateModel> = createEntityAdapter<IBodyShopLocationStateModel>();

export const initialState: IBodyShopLocationState = bodyShopLocationAdapter.getInitialState({
    loaded: null,
    message: null,
    error: null
  } as IBodyShopLocationState);