import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IJobCard } from '@models/body-shop';

export const WORKSHOP_SERVICESHOP_JOBCARD_FEATURE_KEY = 'serviceShopJobCard';

export interface IServiceShopJobCardState extends EntityState<IJobCard> {
  error?: any;
  loaded: boolean;
  message: string;
  submitted: boolean;
}

export interface IServiceShopJobCardPartialState {
  [WORKSHOP_SERVICESHOP_JOBCARD_FEATURE_KEY]: IServiceShopJobCardState;
}

export const serviceshopJobCardAdapter: EntityAdapter<IJobCard> = createEntityAdapter<
  IJobCard
>();

export const initialState: IServiceShopJobCardState = serviceshopJobCardAdapter.getInitialState(
  {
    loaded: false,
    message: null,
    error: null,
    submitted: false
  } as IServiceShopJobCardState
);
