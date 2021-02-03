import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface IAuctionListModel {
  item: {
    title: string;
    dpd: string;
    thumb: string;
  };
  createdBy: string;
  reason: string;
  assignment: string;
  marketValue: string;
  date: string;
  location: string;
  removeIt: boolean;
}

export interface IAuctionListState extends EntityState<IAuctionListModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export const WORKSHOP_AUCTION_LIST_FEATURE_KEY = 'auctionList';

export interface IAuctionListPartialState {
  [WORKSHOP_AUCTION_LIST_FEATURE_KEY]: IAuctionListState;
}

export const auctionListAdapter: EntityAdapter<IAuctionListModel> = createEntityAdapter<
  IAuctionListModel
>();

export const initialState: IAuctionListState = auctionListAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null
  } as IAuctionListState
);
