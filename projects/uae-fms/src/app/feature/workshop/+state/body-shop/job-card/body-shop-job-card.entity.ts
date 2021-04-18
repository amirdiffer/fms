import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IJobCard } from '@models/body-shop';

export const WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY = 'bodyShopJobCard';

export interface IBodyshopJobCardState extends EntityState<IJobCard> {
  error?: any;
  loaded: boolean;
  message: string;
  submitted: boolean;
  resultNumber?: number;
}

export interface IBodyshopJobCardPartialState {
  [WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY]: IBodyshopJobCardState;
}

export const bodyShopJobCardAdapter: EntityAdapter<IJobCard> = createEntityAdapter<
  IJobCard
>();

export const initialState: IBodyshopJobCardState = bodyShopJobCardAdapter.getInitialState(
  {
    loaded: false,
    message: null,
    error: null,
    submitted: false,
    resultNumber: 0
  } as IBodyshopJobCardState
);
