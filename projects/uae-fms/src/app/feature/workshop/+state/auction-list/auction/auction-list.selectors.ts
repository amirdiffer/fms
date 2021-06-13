import { createSelector } from '@ngrx/store';
import { auctionListAdapter } from './auction-list.entity';
const { selectAll } = auctionListAdapter.getSelectors();
const acutionListState = (state) => state['auctionList']

export class AuctionListSelectors {
  static selectAll = createSelector(
    acutionListState,
    selectAll
  );

  static message = createSelector(
    acutionListState,
    (state) => state.message
  );

  static error = createSelector(
    acutionListState,
    (state) => state.error
  );
}
