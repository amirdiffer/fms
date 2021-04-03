import { createSelector } from '@ngrx/store';
import { auctionListAdapter } from './auction-list.entity';
import { WorkshopSelectors } from '@feature/workshop/+state/workshop.selectors';
const { selectAll } = auctionListAdapter.getSelectors();

export class AuctionListSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.auctionListSelector,
    selectAll
  );

  static message = createSelector(
    WorkshopSelectors.auctionListSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.auctionListSelector,
    (state) => state.error
  );
}
