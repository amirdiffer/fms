import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY = 'bodyShopJobCard';

export interface IBodyshopJobCardStateModel {
  item: {
    name: string;
    dpd: string;
    thumb: string;
  };
  task: string;
  startDate: string;
  endDate: string;
  location: string;
  cost: string;
  approval: string;
}

export interface IBodyshopJobCardState
  extends EntityState<IBodyshopJobCardStateModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export interface IBodyshopJobCardPartialState {
  [WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY]: IBodyshopJobCardState;
}

export const bodyShopJobCardAdapter: EntityAdapter<IBodyshopJobCardStateModel> = createEntityAdapter<
  IBodyshopJobCardStateModel
>();

export const initialState: IBodyshopJobCardState = bodyShopJobCardAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null
  } as IBodyshopJobCardState
);
