import { ILocation } from '@models/body-shop';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY = 'bodyShopLocation';
export interface IBodyShopLocationState extends EntityState<ILocation> {
  error?: any;
  loaded: boolean;
  message: string;
  submitted: boolean;
}
export interface IBodyShopLocationPartialState {
  [WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY]: IBodyShopLocationState;
}
export const bodyShopLocationAdapter: EntityAdapter<ILocation> = createEntityAdapter<
  ILocation
>();

export const initialState: IBodyShopLocationState = bodyShopLocationAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null,
    submitted: false
  } as IBodyShopLocationState
);
