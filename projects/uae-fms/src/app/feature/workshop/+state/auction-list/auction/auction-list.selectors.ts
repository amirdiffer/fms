import { createSelector } from '@ngrx/store';
import { auctionListAdapter } from './auction-list.entity';
import { WorkshopSelectors } from '@feature/workshop/+state/workshop.selectors';

export class AuctionListSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.auctionListSelector,
    auctionListAdapter.setAll
  );
}
