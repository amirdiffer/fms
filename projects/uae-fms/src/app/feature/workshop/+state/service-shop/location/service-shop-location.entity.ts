import { ILocation } from '@models/body-shop';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const WORKSHOP_SERVICESHOP_LOCATION_FEATURE_KEY = 'serviceShopLocation';
export interface IServiceShopLocationState extends EntityState<ILocation> {
  error?: any;
  loaded: boolean;
  message: string;
  submitted: boolean;
  resultNumber?:number;
}
export interface IServiceShopLocationPartialState {
  [WORKSHOP_SERVICESHOP_LOCATION_FEATURE_KEY]: IServiceShopLocationState;
}
export const serviceShopLocationAdapter: EntityAdapter<ILocation> = createEntityAdapter<
  ILocation
>();

export const initialState: IServiceShopLocationState = serviceShopLocationAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null,
    submitted: false,
    resultNumber:0
  } as IServiceShopLocationState
);
