import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ISoldListModel {
  statusColor: string,
  item: {
    title: string,
    dpd: string,
    thumb: string
  },
  buyer: string,
  assignedTo: string,
  actualMarketValue: string,
  date: string,
  description: string,
  cost: string
}

export interface ISoldListState extends EntityState<ISoldListModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export const WORKSHOP_SOLD_LIST_FEATURE_KEY = 'soldList';

export interface ISoldListPartialState {
  [WORKSHOP_SOLD_LIST_FEATURE_KEY]: ISoldListState;
}

export const soldListAdapter: EntityAdapter<ISoldListModel> = createEntityAdapter<
  ISoldListModel
>();

export const initialState: ISoldListState = soldListAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null
  } as ISoldListState
);
